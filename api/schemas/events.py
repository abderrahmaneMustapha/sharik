from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation

import graphene

from graphql_jwt.decorators import login_required

from ..models import Event, EventPictures, UserJoinResquest
from ..forms import EventCreationForm, EventPicturesCreationForm, UserJoinResquestCreationForm,  UserJoinResquestAcceptForm

# Types
class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = ['name', 'event_creator', 'description', 'position', 'start_at','end_at', 'profile_pic']

class EventPicturesType(DjangoObjectType):
    class Meta:
        model = EventPictures
        fields = '__all__'


class UserJoinResquestType(DjangoObjectType):
    class Meta:
        model = UserJoinResquest
        fields = '__all__'

#Types end

# mutations
class EventsMutation(DjangoModelFormMutation):
    event =  graphene.Field(EventType)

    @login_required
    def resolve_event(root, info, **kwargs):
        return root.event

    class Meta:
        form_class = EventCreationForm

class EventPicturesMutation(DjangoModelFormMutation):
    events_picture =  graphene.Field(EventPicturesType)

    @login_required
    def resolve_events_picture(root, info, **kwargs):
        return root.events_picture

    class Meta:
        form_class = EventPicturesCreationForm

class UserJoinResquestMutation(DjangoModelFormMutation):
    user_join_request =  graphene.Field(UserJoinResquestType)
    
    @login_required
    def resolve_user_join_request(root, info, **kwargs):
        return root.user_join_request
   

    class Meta:
        form_class = UserJoinResquestCreationForm


class AcceptUserJoinResquestMutation(DjangoModelFormMutation):
    accept_user_join_request = graphene.Field(UserJoinResquestType,id=graphene.ID() ,accept=graphene.Boolean())

    @login_required
    def resolve_accept_user_join_request(root, info, accept, id , **kwargs):
        return UserJoinResquest.objects.filter(id=id).update(accept=accept)

    class Meta:
        form_class = UserJoinResquestAcceptForm

# mutations end

### main mutation
class EventMutation(graphene.ObjectType):
    add_event =  EventsMutation.Field()
    add_event_pictures = EventPicturesMutation.Field()
    add_event_user_join_request = UserJoinResquestMutation.Field()


### main query 
class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)
    events_by_id = graphene.List(EventType, id=graphene.ID())
    get_events_user_join_requests = graphene.List(UserJoinResquestType, id=graphene.ID())
    get_events_user_join_requests_accepted = graphene.List(UserJoinResquestType, id=graphene.ID())
    get_events_user_join_requests_pending = graphene.List(UserJoinResquestType, id=graphene.ID())
    get_event_pictures_by_id = graphene.List(EventPicturesType, id=graphene.ID())

    def resolve_all_events(root, info):
        return Event.objects.all()
    
    @login_required
    def resolve_events_by_id(root, info, id):
        return Event.objects.get(pk=id)

    @login_required
    def resolve_get_events_user_join_requests(root, info, id):
        return UserJoinResquest.objects.get(event__id=id)

    @login_required
    def get_events_user_join_requests_accepted (root, info, id):
        return UserJoinResquest.objects.get(event__id=id, accept=True)

    @login_required
    def get_events_user_join_requests_pending (root, info, id):
        return UserJoinResquest.objects.get(event__id=id, accept=False)
    
    @login_required
    def resolve_get_event_pictures_by_id(root, info, id):
        return EventPictures.objects.filter(event__id=id)