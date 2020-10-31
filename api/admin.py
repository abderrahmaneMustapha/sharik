from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass

@admin.register(UserJoinResquest)
class  UserJoinResquestAdmin(admin.ModelAdmin):
    pass

@admin.register(EventPictures)
class  EventPicturesAdmin(admin.ModelAdmin):
    pass

@admin.register(Member)
class  MemeberAdmin(admin.ModelAdmin):
    pass

@admin.register(Tags)
class  TagsAdmin(admin.ModelAdmin):
    pass
