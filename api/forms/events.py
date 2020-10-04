from ..models import Event,  EventPictures, UserJoinResquest
from django import forms

class EventCreationForm(forms.ModelForm):
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
