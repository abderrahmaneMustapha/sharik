#django
from django.db import models
from django.utils.text import slugify
from django.core.validators import FileExtensionValidator
from django.utils.translation import ugettext_lazy as _

#python 
from datetime import datetime

#me
from ..validators import validate_image_size
from .users import Member
from .base import Tags
# Choices.
Past =1
Current =2
Upcomming =  3
EVENT_STATUS = (
    (Past , _("Post")),
    (Current, _("Current")),
    (Upcomming, _("Up Comming"))
)

# Create your models here.
class Event(models.Model):
    name = models.CharField(_('event name'),max_length=500 )
    slug = models.SlugField(_('event slug'))
    event_creator  = models.ForeignKey(Member, verbose_name=_('event creator'), on_delete=models.CASCADE)
    description = models.TextField(max_length=300)    
    position = models.CharField('event place,  city or country',max_length=200)
    tags = models.ManyToManyField(Tags, verbose_name=_("event tags"))
    start_at = models.DateField(_('event starting date'))
    end_at = models.DateField(_('event ending date'))
    status = models.IntegerField(_("Event statu"), choices = EVENT_STATUS , default=1) # specify the if this a past event  , upcoming or current
    profile_pic = models.ImageField(_('profile pic'), upload_to='users/profile_pics',
    validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])], null=True, blank=True)
    is_accepted = models.BooleanField(_(" accept this event"), default=False)
    archived = models.BooleanField(_("archive this event"), default=False)
    done =  models.BooleanField(_("this event is done"), default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def get_event_end_at(self):
        return self.end_at
    def get_event_creator(self):
        return self.event_creator 
    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"
        
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''    
        self.slug= slugify("{} {}".format(self.name,self.pk)) 
        super(Event, self).save(*args, **kwargs)
       
    
    def __str__(self):
        return str(self.name)


class EventEndConfirmation(models.Model):
    event  =  models.ForeignKey(Event, verbose_name=_("event confirmed"), on_delete=models.CASCADE)
    text  =  models.TextField(_('event text'))
    accepted  = models.BooleanField(_('event confirmation accepted'), null=True)

class EventPictures(models.Model):
    event  = models.ForeignKey(Event,verbose_name=_('event'), on_delete=models.CASCADE)
    pictures = models.ImageField(_('profile pic'), upload_to='users/event_pictures/{}'.format(event.name),
    validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])])
    on_creation  = models.BooleanField(_("event pictures when the user created the event"), default=False)
    on_end = models.BooleanField(_("event pictures when the event end"), default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
class EventLike(models.Model):
    event  = models.ForeignKey(Event,verbose_name=_('event'), on_delete=models.CASCADE)
    user = models.ForeignKey(Member, verbose_name=_('the user who like this event'), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if EventLike.objects.filter(event=self.event, user=self.user).count() < 20:
            super(EventLike, self).save(*args, **kwargs)

class EventFav(models.Model):
    event  = models.ForeignKey(Event,verbose_name=_('event'), on_delete=models.CASCADE)
    user = models.ForeignKey(Member, verbose_name=_('the user who fav this event'), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
        if not EventFav.objects.filter(event=self.event, user=self.user).exists():
            super(EventFav, self).save(*args, **kwargs)

class EventHate(models.Model):
    event  = models.ForeignKey(Event,verbose_name=_('event'), on_delete=models.CASCADE)
    user = models.ForeignKey(Member, verbose_name=_('the user who hate this event'), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not EventHate.objects.filter(event=self.event, user=self.user).exists():
            super(EventHate, self).save(*args, **kwargs)


# was there means event page view
class EventWasthere(models.Model):
    event  = models.ForeignKey(Event,verbose_name=_('event'), on_delete=models.CASCADE)
    user = models.ForeignKey(Member, verbose_name=_('the user who was there '), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
        if not EventWasthere.objects.filter(event=self.event, user=self.user).exists():
            super(EventWasthere, self).save(*args, **kwargs)


class UserJoinResquest(models.Model):
    event  = models.ForeignKey(Event,verbose_name=_('event'), on_delete=models.CASCADE)
    request_from = models.ForeignKey(Member, verbose_name=_('the user who want join this event'), on_delete=models.CASCADE)
    text = models.TextField(_("event description"), null=True, blank=True)
    pictures = models.ImageField(_('profile pic'), upload_to='users/profile_pics',
    validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])], null=True, blank=True)
    accept = models.BooleanField(_("accept this request"), default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def get_event_owner(self):
        return self.event.event_creator

    def update(self, *args, **kwargs):
        """ check if this event was already end """
        today = datetime.date(datetime.now())
        if self.event.end_at < today:
            raise Exception('can not send join request to past events')
        super(UserJoinResquest, self).update(*args, **kwargs)
    def save(self, *args, **kwargs):

        """ check if the user want join his own event """
        user_want_join_his_event = self.request_from == self.event.event_creator 
        if user_want_join_his_event:
            raise Exception('User cant send join request to his own event')

        """ check if the user already sent a request to join this event """
        user_cant_send_multi_req = UserJoinResquest.objects.filter(event=self.event, request_from=self.request_from).exists()     
        if user_cant_send_multi_req  :
            raise Exception('User cant send join request more than once to the same event')
        
        """ check if this event was already end """
        today = datetime.date(datetime.now())
        if self.event.end_at < today:
            raise Exception('can not send join request to past events')

        super(UserJoinResquest, self).save(*args, **kwargs)

