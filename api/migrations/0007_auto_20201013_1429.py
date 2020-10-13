# Generated by Django 3.1.1 on 2020-10-13 13:29

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20201013_1425'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='key',
            field=models.UUIDField(default=uuid.uuid4, unique=True),
        ),
    ]
