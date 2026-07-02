from django.urls import path

from .views import (
    AnswerQuizView,
    MistakesView,
    QuizDetailView,
    QuizListView,
    SharedQuizAnswerView,
    SharedQuizView,
    StatsView,
)

urlpatterns = [
    path("", QuizListView.as_view(), name="quiz-list"),
    # MVP2 (Lot 6) — placés AVANT <int:pk> pour ne pas être captés comme un id.
    path("stats/", StatsView.as_view(), name="quiz-stats"),
    path("mistakes/", MistakesView.as_view(), name="quiz-mistakes"),
    # MVP2 (Lot 14) — partage de quiz
    path("shared/<uuid:token>/", SharedQuizView.as_view(), name="quiz-shared"),
    path("shared/<uuid:token>/answer/", SharedQuizAnswerView.as_view(), name="quiz-shared-answer"),
    path("<int:pk>/", QuizDetailView.as_view(), name="quiz-detail"),
    path("<int:pk>/answer/", AnswerQuizView.as_view(), name="quiz-answer"),
]
