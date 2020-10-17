from notifications.base.models import AbstractNotification
from django.db import models
from notifications.models import Notification
class Notification(AbstractNotification):
 

    class Meta(AbstractNotification.Meta):
        abstract = False
    
    def save(self, *args, **kwargs):
        if Notification.objects.filter(verb=self.verb, recipient=self.recipient).exists() :
            raise Exception(" already sent ")
        
        super(Notification, self).save(*args, **kwargs)