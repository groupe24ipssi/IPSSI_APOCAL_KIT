import uuid

from django.db import migrations, models


def gen_uuids(apps, schema_editor):
    Quiz = apps.get_model("quizzes", "Quiz")
    for quiz in Quiz.objects.all():
        quiz.share_token = uuid.uuid4()
        quiz.save(update_fields=["share_token"])


class Migration(migrations.Migration):

    dependencies = [
        ("quizzes", "0003_quiz_difficulty"),
    ]

    operations = [
        migrations.AddField(
            model_name="quiz",
            name="is_public",
            field=models.BooleanField(
                default=False,
                help_text="Quiz accessible publiquement via lien de partage.",
            ),
        ),
        migrations.AddField(
            model_name="quiz",
            name="share_token",
            field=models.UUIDField(
                default=uuid.uuid4,
                null=True,
                editable=False,
                help_text="Token unique pour le lien de partage public.",
            ),
        ),
        migrations.RunPython(gen_uuids, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="quiz",
            name="share_token",
            field=models.UUIDField(
                default=uuid.uuid4,
                unique=True,
                editable=False,
                help_text="Token unique pour le lien de partage public.",
            ),
        ),
    ]
