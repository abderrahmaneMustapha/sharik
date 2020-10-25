# background task
from background_task import background

#python
from datetime import datetime

#me
from api.models import Event

#notifications
from notifications.signals import notify

@background(schedule=1)
def get_completed_events():
    today = datetime.now()
    events  =  Event.objects.filter(is_accepted=True, start_at__lt=today, end_at__lt=today)
    for event in events:
            notify.send(recipient=event.get_event_creator(), verb='your event {} ends on {} , please confirm this '.format(event.name, event.end_at))
            event.done = True
            event.save()
        

