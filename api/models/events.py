from django.db import models
from django.utils.text import slugify
from django.core.validators import FileExtensionValidator
from django.utils.translation import ugettext_lazy as _

#me
from ..validators import validate_image_size
from .users import Member

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
    start_at = models.DateField(_('event starting date'))
    end_at = models.DateField(_('event ending date'))
    status = models.IntegerField(_("Event statu"), choices = EVENT_STATUS , default=1) # specify the if this a past event  , upcoming or current
    profile_pic = models.ImageField(_('profile pic'), upload_to='users/profile_pics',
    validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])])
    is_accepted = models.BooleanField(_(" accept this event"))
    archived = models.BooleanField(_("archive this event"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''    
                
        super(Event, self).save(*args, **kwargs)
        self.slug= slugify("{} {}".format(self.name,self.pk)) 
    
    def __str__(self):
        return str(self.name)

class EventPictures(models.Model):
    event  = models.ForeignKey(Event,verbose_name=_('event'), on_delete=models.CASCADE)
    pictures = models.ImageField(_('profile pic'), upload_to='users/profile_pics',
    validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserJoinResquest(models.Model):
    event  = models.ForeignKey(Event,verbose_name=_('event'), on_delete=models.CASCADE)
    request_from = models.ForeignKey(Member, verbose_name=_('the user who want join this event'), on_delete=models.CASCADE)
    text = models.TextField(_("event description"))
    pictures = models.ImageField(_('profile pic'), upload_to='users/profile_pics',
    validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
