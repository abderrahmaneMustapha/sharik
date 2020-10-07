from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
from django.utils.text import slugify
import graphene

from graphql_jwt.decorators import login_required

from graphene_file_upload.scalars import Upload

from ..models import Event, EventPictures, UserJoinResquest, Member
from ..forms import EventCreationForm, EventPicturesCreationForm, UserJoinResquestCreationForm,  UserJoinResquestAcceptForm

# Types
class EventType(DjangoObjectType):
    class Meta:
        model = Event
        
  

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
class EventsMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        description = graphene.String()
        position = graphene.String()
        start_at = graphene.Date()
        end_at = graphene.Date()
        profile_pic =  Upload()

    success= graphene.Boolean()
    event = graphene.Field(EventType)

    def mutate(root, info, name , description, position, start_at, end_at, profile_pic):
        event  = Event.objects.create(name=name, event_creator=Member.objects.get(pk=info.context.user.pk), description=description, position=position, start_at=start_at, end_at=end_at, profile_pic=profile_pic)
        event.slug = slugify("{} {}".format(event.id ,  event.name))
        event.save()
        success=True
        return EventsMutation(event=event, success=success)

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
    get_event_by_slug = graphene.Field(EventType, slug=graphene.String())
    events_by_id = graphene.List(EventType, id=graphene.ID())
    get_events_user_join_requests = graphene.List(UserJoinResquestType, id=graphene.ID())
    get_events_user_join_requests_accepted = graphene.List(UserJoinResquestType, id=graphene.ID())
    get_events_user_join_requests_pending = graphene.List(UserJoinResquestType, id=graphene.ID())
    get_event_pictures_by_id = graphene.List(EventPicturesType, id=graphene.ID())
    
    @login_required
    def resolve_all_events(root, info):
        return Event.objects.filter(is_accepted=True)
    
    @login_required
    def resolve_get_event_by_slug(root, info, slug):
        return Event.objects.get(slug=slug)
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