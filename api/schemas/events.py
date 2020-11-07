#django
from django.utils.text import slugify
from graphql import GraphQLError
# graphql
from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
import graphene
from graphql_jwt.decorators import login_required
from graphene_file_upload.scalars import Upload

#notifications
from notifications.models import Notification

#me
from ..models import Event, EventPictures, UserJoinResquest, Member,  EventEndConfirmation,EventFav, EventHate, EventLike, EventWasthere, Tags
from ..forms import EventCreationForm, EventEndConfirmationForm, EventPicturesCreationForm, UserJoinResquestCreationForm,  UserJoinResquestAcceptForm

#python
from datetime import datetime 

#notifications
from notifications.signals import notify

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


class  EventEndConfirmationType(DjangoObjectType):
    class Meta : 
        model = EventEndConfirmation
        fields = ['text', 'event']
class EventFavType(DjangoObjectType):
    class Meta : 
        model = EventFav

class EventLikeType(DjangoObjectType):
    class Meta : 
        model = EventLike

class EventHateType(DjangoObjectType):
    class Meta : 
        model = EventHate

class EventWasthereType(DjangoObjectType):
    class Meta : 
        model = EventWasthere
#Types end

# mutations
class EventsMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        description = graphene.String()
        position = graphene.String()
        tags = graphene.List(graphene.String)
        start_at = graphene.Date()
        end_at = graphene.Date()
        profile_pic =  Upload()

    success= graphene.Boolean()
    event = graphene.Field(EventType)

    def mutate(root, info, name , description, position, tags ,start_at, end_at, profile_pic):
        ''' check if the start data is greate than the end date and greater or equal to the current date '''
        today = datetime.date(datetime.now())
        if start_at < today : 
            raise GraphQLError("the field start at must be greater than today date")
        if (start_at > end_at) :    
            raise GraphQLError("the field end at must be greater than start at field")

        event  = Event.objects.create(name=name, event_creator=Member.objects.get(pk=info.context.user.pk), description=description, position=position, start_at=start_at, end_at=end_at, profile_pic=profile_pic)
        
    
        for tag in tags :
            tag_object = Tags.objects.get(name=tag)
            event.tags.add(tag_object)

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
        event_picture = EventPictures.objects.create(event=Event.objects.get(id=event), pictures=photos, on_creation=True)
        success = True
        return EventPicturesMutation(event_picture=event_picture, success=success)

class EventEndPicturesMutation(graphene.Mutation):
    class Arguments :
        event  = graphene.ID()
        photos = Upload()

    success = graphene.Boolean()
    event_picture = graphene.Field(EventPicturesType)   

    def mutate(root, info, event, photos):
        event_picture = EventPictures.objects.create(event=Event.objects.get(id=event), pictures=photos, on_end=True)
        success = True
        return EventPicturesMutation(event_picture=event_picture, success=success)
class UserJoinResquestMutation(graphene.Mutation):
    class Arguments: 
        id = graphene.ID()
    
    success  = graphene.Boolean()
    event_join_req= graphene.Field(UserJoinResquestType)

    @login_required
    def mutate(root, info, id):
        today = datetime.date(datetime.now())
        event = Event.objects.filter(id=id).first()
        end_at = event.get_event_end_at()
      
        if today > end_at :
            raise Exception(" Cant join past events")
            event_join_req =None
            success = False
        else:
            notification = Notification.objects.filter(recipient=event.get_event_creator(), verb=' {} want to join your event'.format(info.context.user)).exists()
            if not notification : 
                notify.send(info.context.user , recipient=event.get_event_creator(), verb=' {} want to join your event'.format(info.context.user))
            event_join_req =UserJoinResquest.objects.create(event=event, request_from=info.context.user)
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

class EventLikeMutation(graphene.Mutation):
    class Arguments:
        id= graphene.ID()
    
    success = graphene.Boolean()
    event_like = graphene.Field(EventLikeType)
    event_like_numbers = graphene.Int()

    @login_required
    def mutate(root, info, id):
        event = Event.objects.get(id= id)
        event_like  = EventLike.objects.create(event=event,  user=info.context.user)
        event_like_numbers = EventLike.objects.filter(event=event).count()
        success= True
        return EventLikeMutation(event_like=event_like, success=success,event_like_numbers=event_like_numbers )

class EventFavMutation(graphene.Mutation):
    class Arguments:
        id= graphene.ID()
    
    success = graphene.Boolean()
    event_fav = graphene.Field(EventFavType)
    event_fav_numbers = graphene.Int()
    @login_required
    def mutate(root, info, id):
        event = Event.objects.get(id= id)
        event_fav  = EventFav.objects.create(event=event, user=info.context.user)
        event_fav_numbers = EventFav.objects.filter(event=event).count()
        success= True
        return  EventFavMutation(event_fav=event_fav,event_fav_numbers=event_fav_numbers, success=success)

class EventWasthereMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    success = graphene.Boolean()
    event_was_there = graphene.Field(EventFavType)
    event_was_there_numbers = graphene.Int()
    @login_required
    def mutate(root, info, id):
        event = Event.objects.get(id= id)
        event_was_there  =EventWasthere.objects.create(event=event, user=info.context.user)
        event_was_there_numbers = EventWasthere.objects.filter(event=event).count()
        success= True
        return  EventWasthereMutation(event_was_there=event_was_there,event_was_there_numbers=event_was_there_numbers,success=success)
class EventHateMutation(graphene.Mutation):
    class Arguments:
        id= graphene.ID()
    
    success = graphene.Boolean()
    event_hate = graphene.Field(EventFavType)
    

    @login_required
    def mutate(root, info, id):
        event = Event.objects.get(id= id)
        event_hate   = EventHate.objects.create(event=event, user=info.context.user)
        success= True
        return  EventHateMutation(event_hate =event_hate, success=success)


class  EventEndConfirmationMutations(DjangoModelFormMutation):
    event_end_confirmation = graphene.Field(EventEndConfirmationType)
    class Meta:
        form_class = EventEndConfirmationForm

# mutations end

### main mutation
class EventMutation(graphene.ObjectType):
    add_event =  EventsMutation.Field()
    add_event_pictures_on_creation = EventPicturesMutation.Field()
    add_event_pictures_on_end = EventEndPicturesMutation.Field()
    add_event_user_join_request = UserJoinResquestMutation.Field()
    accept_event_user_join_request = AcceptUserJoinResquestMutation.Field()
    event_end_confirmation =  EventEndConfirmationMutations.Field()
    event_favorite = EventFavMutation.Field()
    event_like = EventLikeMutation.Field()
    event_hate = EventHateMutation.Field()
    event_was_there = EventWasthereMutation.Field()
    

### main query 
class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)
    current_all_events =  graphene.List(EventType)
    upcoming_all_events =  graphene.List(EventType)
    get_recent_user_events = graphene.List(EventType)
    past_all_events =  graphene.List(EventType)
    get_event_by_slug = graphene.Field(EventType, slug=graphene.String())
    events_by_id = graphene.List(EventType, id=graphene.ID())

    get_events_user_join_requests = graphene.List(UserJoinResquestType, id=graphene.ID())
    get_events_user_join_requests_accepted = graphene.List(UserJoinResquestType, slug=graphene.String())
    get_events_user_join_requests_pending = graphene.List(UserJoinResquestType, slug=graphene.String())
    get_event_pictures_by_id_on_creation = graphene.List(EventPicturesType, id=graphene.ID())
    get_event_pictures_by_id_on_end = graphene.List(EventPicturesType, id=graphene.ID())
    
    get_events_likes_numbers = graphene.Int( id=graphene.ID())
    get_events_favs_numbers = graphene.Int( id=graphene.ID())
    get_events_was_there_numbers = graphene.Int( id=graphene.ID())

    
    @login_required
    def resolve_all_events(root, info):
        return Event.objects.filter(is_accepted=True)
    
    @login_required
    def resolve_current_all_events(root, info):
        today = datetime.date(datetime.now())
        return Event.objects.filter(is_accepted=True, start_at__lte=today, end_at__gte=today)
    
    @login_required
    def resolve_past_all_events(root, info):
        today = datetime.date(datetime.now())
        return Event.objects.filter(is_accepted=True, start_at__lt=today, end_at__lt=today)

    @login_required
    def resolve_upcoming_all_events(root, info):
        today = datetime.date(datetime.now())  
        return Event.objects.filter(is_accepted=True, start_at__gt=today,end_at__gt=today)
    
    @login_required 
    def resolve_get_recent_user_events(root, info):
        return Event.objects.filter(event_creator__pk=info.context.user.pk).order_by('-created_at')[:4]
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
        if (UserJoinResquest.objects.filter(event__slug=slug).first().get_event_owner() != info.context.user):
            raise GraphQLError("Permission denied")
            return None
        return UserJoinResquest.objects.filter(event__slug=slug, accept=False)
    
    @login_required
    def resolve_get_event_pictures_by_id_on_creation(root, info, id):
        
        return EventPictures.objects.filter(event__id=id, on_creation=True)
    
    @login_required
    def resolve_get_event_pictures_by_id_on_end(root, info, id):
        return EventPictures.objects.filter(event__id=id, on_end=True)

    @login_required
    def resolve_get_events_likes_numbers(root, info, id):
        return EventLike.objects.filter(event__id=id).count()
    
    @login_required
    def resolve_get_events_favs_numbers(root, info, id):
        return EventFav.objects.filter(event__id=id).count()
    
    @login_required
    def resolve_get_events_was_there_numbers(root, info, id):
        return EventWasthere.objects.filter(event__id=id).count()