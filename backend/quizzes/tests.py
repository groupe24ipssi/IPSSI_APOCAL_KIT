"""Tests pour l'app quizzes — K1 (list/detail) + K2 (answer) + partage (Lot 14)."""

import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from .models import Question, Quiz

pytestmark = pytest.mark.django_db


@pytest.fixture
def user() -> User:
    return User.objects.create_user(username="alice", password="motdepasse123")


@pytest.fixture
def other_user() -> User:
    return User.objects.create_user(username="bob", password="motdepasse123")


@pytest.fixture
def auth_client(user) -> APIClient:
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.fixture
def sample_quiz(user) -> Quiz:
    quiz = Quiz.objects.create(
        user=user,
        title="Cours de test",
        source_text="Lorem ipsum dolor sit amet.",
        score=None,
    )
    for i in range(1, 11):
        Question.objects.create(
            quiz=quiz,
            index=i,
            prompt=f"Question {i} ?",
            options=["A", "B", "C", "D"],
            correct_index=0,  # bonne réponse = A pour toutes
        )
    return quiz


def test_quiz_list_requires_auth():
    response = APIClient().get("/api/quizzes/")
    assert response.status_code in (401, 403)


def test_quiz_list_returns_user_quizzes(auth_client, sample_quiz):
    response = auth_client.get("/api/quizzes/")
    assert response.status_code == 200
    assert response.data["count"] == 1
    assert response.data["results"][0]["nb_questions"] == 10


def test_quiz_list_does_not_leak_other_users_quizzes(auth_client, other_user):
    Quiz.objects.create(user=other_user, title="Quiz de Bob", source_text="...")
    response = auth_client.get("/api/quizzes/")
    assert response.data["count"] == 0


def test_quiz_detail(auth_client, sample_quiz):
    response = auth_client.get(f"/api/quizzes/{sample_quiz.id}/")
    assert response.status_code == 200
    assert len(response.data["questions"]) == 10


def test_quiz_detail_404_for_other_users_quiz(auth_client, other_user):
    other_quiz = Quiz.objects.create(user=other_user, title="Privé", source_text="...")
    response = auth_client.get(f"/api/quizzes/{other_quiz.id}/")
    assert response.status_code == 404


# --- K2 : answer endpoint ---


def test_answer_all_correct(auth_client, sample_quiz):
    """Toutes les bonnes réponses (= 0 partout) → score 10/10."""
    response = auth_client.post(
        f"/api/quizzes/{sample_quiz.id}/answer/",
        {"answers": [{"index": i, "selected_index": 0} for i in range(1, 11)]},
        format="json",
    )
    assert response.status_code == 200, response.data
    assert response.data["score"] == 10
    assert response.data["total"] == 10
    assert all(d["correct"] for d in response.data["details"])
    sample_quiz.refresh_from_db()
    assert sample_quiz.score == 10


def test_answer_all_wrong(auth_client, sample_quiz):
    response = auth_client.post(
        f"/api/quizzes/{sample_quiz.id}/answer/",
        {"answers": [{"index": i, "selected_index": 1} for i in range(1, 11)]},
        format="json",
    )
    assert response.data["score"] == 0


def test_answer_partial(auth_client, sample_quiz):
    """5 bonnes + 5 mauvaises."""
    answers = [{"index": i, "selected_index": 0} for i in range(1, 6)] + [
        {"index": i, "selected_index": 1} for i in range(6, 11)
    ]
    response = auth_client.post(
        f"/api/quizzes/{sample_quiz.id}/answer/",
        {"answers": answers},
        format="json",
    )
    assert response.data["score"] == 5


def test_answer_requires_10(auth_client, sample_quiz):
    response = auth_client.post(
        f"/api/quizzes/{sample_quiz.id}/answer/",
        {"answers": [{"index": 1, "selected_index": 0}]},
        format="json",
    )
    assert response.status_code == 400


def test_answer_404_for_other_users_quiz(auth_client, other_user):
    other_quiz = Quiz.objects.create(user=other_user, title="Privé", source_text="...")
    for i in range(1, 11):
        Question.objects.create(
            quiz=other_quiz,
            index=i,
            prompt=f"Q{i}",
            options=["A", "B", "C", "D"],
            correct_index=0,
        )
    response = auth_client.post(
        f"/api/quizzes/{other_quiz.id}/answer/",
        {"answers": [{"index": i, "selected_index": 0} for i in range(1, 11)]},
        format="json",
    )
    assert response.status_code == 404


# ---------------------------------------------------------------------------
# Lot 14 — Partage de quiz
# ---------------------------------------------------------------------------


@pytest.fixture
def public_quiz(user) -> Quiz:
    quiz = Quiz.objects.create(
        user=user,
        title="Quiz public",
        source_text="Partageable.",
        is_public=True,
    )
    for i in range(1, 11):
        Question.objects.create(
            quiz=quiz,
            index=i,
            prompt=f"Q{i}",
            options=["A", "B", "C", "D"],
            correct_index=0,
        )
    return quiz


class TestSharedQuizView:
    def test_get_public_quiz_no_auth(self, public_quiz):
        response = APIClient().get(f"/api/quizzes/shared/{public_quiz.share_token}/")
        assert response.status_code == 200
        assert response.data["title"] == "Quiz public"

    def test_does_not_expose_correct_index(self, public_quiz):
        response = APIClient().get(f"/api/quizzes/shared/{public_quiz.share_token}/")
        assert response.status_code == 200
        for q in response.data["questions"]:
            assert "correct_index" not in q

    def test_404_for_private_quiz(self, sample_quiz):
        response = APIClient().get(f"/api/quizzes/shared/{sample_quiz.share_token}/")
        assert response.status_code == 404

    def test_404_for_invalid_token(self):
        response = APIClient().get(
            "/api/quizzes/shared/00000000-0000-0000-0000-000000000000/"
        )
        assert response.status_code == 404

    def test_404_when_toggled_off(self, auth_client, user):
        quiz = Quiz.objects.create(user=user, title="T", source_text="S", is_public=True)
        token = quiz.share_token
        auth_client.patch(f"/api/quizzes/{quiz.id}/", {"is_public": False}, format="json")
        response = APIClient().get(f"/api/quizzes/shared/{token}/")
        assert response.status_code == 404


class TestSharedQuizAnswer:
    def test_answer_public_quiz_no_auth(self, public_quiz):
        answers = [{"index": i, "selected_index": 0} for i in range(1, 11)]
        response = APIClient().post(
            f"/api/quizzes/shared/{public_quiz.share_token}/answer/",
            {"answers": answers},
            format="json",
        )
        assert response.status_code == 200
        assert response.data["score"] == 10

    def test_does_not_persist_score(self, public_quiz):
        answers = [{"index": i, "selected_index": 0} for i in range(1, 11)]
        APIClient().post(
            f"/api/quizzes/shared/{public_quiz.share_token}/answer/",
            {"answers": answers},
            format="json",
        )
        public_quiz.refresh_from_db()
        assert public_quiz.score is None

    def test_does_not_persist_selected_index(self, public_quiz):
        answers = [{"index": i, "selected_index": 0} for i in range(1, 11)]
        APIClient().post(
            f"/api/quizzes/shared/{public_quiz.share_token}/answer/",
            {"answers": answers},
            format="json",
        )
        for q in public_quiz.questions.all():
            assert q.selected_index is None


class TestTogglePublic:
    def test_owner_can_toggle_public(self, auth_client, sample_quiz):
        resp = auth_client.patch(
            f"/api/quizzes/{sample_quiz.id}/",
            {"is_public": True},
            format="json",
        )
        assert resp.status_code == 200
        assert resp.data["is_public"] is True

    def test_owner_can_toggle_off(self, auth_client, public_quiz):
        resp = auth_client.patch(
            f"/api/quizzes/{public_quiz.id}/",
            {"is_public": False},
            format="json",
        )
        assert resp.status_code == 200
        assert resp.data["is_public"] is False

    def test_non_owner_cannot_toggle(self, auth_client, other_user):
        quiz = Quiz.objects.create(user=other_user, title="X", source_text="Y")
        resp = auth_client.patch(
            f"/api/quizzes/{quiz.id}/",
            {"is_public": True},
            format="json",
        )
        assert resp.status_code == 404
