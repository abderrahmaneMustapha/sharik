#django
from django.utils.text import slugify
from graphql import GraphQLError
# graphql
from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
import graphene
from graphql_jwt.decorators import login_required
from graphene_file_upload.scalars import Upload

#me
from ..models import Event, EventPictures, UserJoinResquest, Member
from ..forms import EventCreationForm, EventPicturesCreationForm, UserJoinResquestCreationForm,  UserJoinResquestAcceptForm
#python
from datetime import datetime 


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
        fields =['id', 'event', 'request_from', 'text', "pictures", 'accept', 'created_at']

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
        ''' check if the start data is greate than the end date and greater or equal to the current date '''
        today = datetime.date(datetime.now())
        if start_at < today : 
            raise GraphQLError("the field start at must be greater than today date")
        if (start_at > end_at) :    
            raise GraphQLError("the field end at must be greater than start at field")

        event  = Event.objects.create(name=name, event_creator=Member.objects.get(pk=info.context.user.pk), description=description, position=position, start_at=start_at, end_at=end_at, profile_pic=profile_pic)
        event.slug = slugify("{} {}".format(event.id ,  event.name))
        event.save()
        success=True
        return EventsMutation(event=event, success=success)

class EventPicturesMutation(graphene.Mutation):
    class Arguments :
        event  = graphene.ID()
        photos = Upload()

    success = graphene.Boolean()
    event_picture = graphene.Field(EventPicturesType)   

    def mutate(root, info, event, photos):
        event_picture = EventPictures.objects.create(event=Event.objects.get(id=event), pictures=photos)
        success = True
        return EventPicturesMutation(event_picture=event_picture, success=success)

class UserJoinResquestMutation(graphene.Mutation):
    class Arguments: 
        id = graphene.ID()
    
    success  = graphene.Boolean()
    event_join_req= graphene.Field(UserJoinResquestType)

    @login_required
    def mutate(root, info, id):
        event_join_req =UserJoinResquest.objects.create(event=Event.objects.get(id=id),request_from=info.context.user)
        success = True
        return UserJoinResquestMutation(event_join_req=event_join_req, success=success)


class AcceptUserJoinResquestMutation(graphene.Mutation):
    class Arguments: 
        id = graphene.ID()
    
    success  = graphene.Boolean()
    event_join_req= graphene.Field(UserJoinResquestType)


    @login_required
    def mutate(root, info, id ):
        join_req = UserJoinResquest.objects.filter(id=id)
        if (join_req.first().get_event_owner()==info.context.user):
            join_req.update(accept=True)
            event_join_req = join_req.first()
            success = True
        else : 
            event_join_req = None
            success = False
            raise Exception("Permission denied")
        return AcceptUserJoinResquestMutation(event_join_req= event_join_req, success=success)

# mutations end


### main mutation
class EventMutation(graphene.ObjectType):
    add_event =  EventsMutation.Field()
    add_event_pictures_on_creation = EventPicturesMutation.Field()
    add_event_user_join_request = UserJoinResquestMutation.Field()
    accept_event_user_join_request = AcceptUserJoinResquestMutation.Field()
    


### main query 
class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)
    get_event_by_slug = graphene.Field(EventType, slug=graphene.String())
    events_by_id = graphene.List(EventType, id=graphene.ID())
    get_events_user_join_requests = graphene.List(UserJoinResquestType, id=graphene.ID())
    get_events_user_join_requests_accepted = graphene.List(UserJoinResquestType, slug=graphene.String())
    get_events_user_join_requests_pending = graphene.List(UserJoinResquestType, slug=graphene.String())
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
    def resolve_get_events_user_join_requests_accepted (root, info, slug):
        return UserJoinResquest.objects.filter(event__slug=slug, accept=True)

    @login_required
    def resolve_get_events_user_join_requests_pending (root, info, slug):
        return UserJoinResquest.objects.filter(event__slug=slug, accept=False)
    
    @login_required
    def resolve_get_event_pictures_by_id(root, info, id):
        return EventPictures.objects.filter(event__id=id)