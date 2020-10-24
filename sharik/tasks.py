from background_task import background
from datetime import datetime
from api.models import Event
@background(schedule=1)
def get_completed_events():
    today = datetime.now()
    print("today ", today)
    events  =  Event.objects.filter(is_accepted=True, start_at__lte=today, end_at__gte=today)
    for event in events:
        print(event.name)
        event.name="new event"
        event.save()
        

