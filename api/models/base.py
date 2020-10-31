from django.db import models

class Tags(models.Model):
    name = models.CharField("tag name", max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)