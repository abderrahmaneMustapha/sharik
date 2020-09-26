from ..models import Event,  EventPictures, UserJoinResquest
from django import forms

class EventCreationForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = '__all__'

class  EventPicturesCreationForm(forms.ModelForm):
    class Meta:
        model =  EventPictures
        fields = '__all__'

class UserJoinResquestCreationForm(forms.ModelForm):
    class Meta:
        model =  UserJoinResquest
        fields = '__all__'
