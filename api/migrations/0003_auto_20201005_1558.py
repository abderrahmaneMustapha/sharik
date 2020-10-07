# Generated by Django 3.1.1 on 2020-10-05 14:58

import api.validators
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_userjoinresquest_accept'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='users/profile_pics', validators=[api.validators.validate_image_size, django.core.validators.FileExtensionValidator(['jpg', 'jpeg', 'png', 'webp', 'svg'])], verbose_name='profile pic'),
        ),
    ]