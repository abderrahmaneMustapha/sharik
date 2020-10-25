# Generated by Django 3.1.1 on 2020-10-24 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20201013_1429'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='done',
            field=models.BooleanField(default=False, verbose_name='this event is done'),
        ),
        migrations.AddField(
            model_name='eventpictures',
            name='on_creation',
            field=models.BooleanField(default=False, verbose_name='event pictures when the user created the event'),
        ),
        migrations.AddField(
            model_name='eventpictures',
            name='on_end',
            field=models.BooleanField(default=False, verbose_name='event pictures when the event end'),
        ),
    ]