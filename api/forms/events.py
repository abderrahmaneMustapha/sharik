
from django.core.validators import FileExtensionValidator
from django import forms

#me
from ..validators import validate_image_size
from ..models import Event,  EventPictures, UserJoinResquest

class EventCreationForm(forms.ModelForm):
    profile_pic = forms.ImageField(validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])])
    class Meta:
        model = Event
        fields = ['name', 'event_creator', 'description', 'position', 'start_at','end_at', 'profile_pic']

class  EventPicturesCreationForm(forms.ModelForm):
    class Meta:
        model =  EventPictures
        fields = '__all__'

class UserJoinResquestCreationForm(forms.ModelForm):
    class Meta:
        model =  UserJoinResquest
        fields = '__all__'

class UserJoinResquestAcceptForm(forms.ModelForm):
    class Meta:
        model =  UserJoinResquest
        fields = ['accept']
