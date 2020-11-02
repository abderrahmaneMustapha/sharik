from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django import DjangoListField
from ..models import Member,Tags
from ..forms import MemberCreationForm
import   graphene 
from notifications.models import Notification
from graphql_jwt.decorators import login_required
##################################
################################## OBJECTS TYPES
class MembersType(DjangoObjectType):
    class Meta:
        model = Member
        fields = '__all__'

class TagsType(DjangoObjectType):
    class Meta:
        model  = Tags
        fields  = '__all__'

class NotificationsType(DjangoObjectType):
    class Meta:
        model = Notification
        fields = '__all__'

class TagsType(DjangoObjectType):
    class Meta:
        model = Tags
        fields= '__all__'
########################################
########################################
######################################## Forms Mutations
class MembersMutation(DjangoModelFormMutation):
    member =  graphene.Field(MembersType)
    class Meta:
        form_class = MemberCreationForm

class addTagsToUserMutation(graphene.Mutation):
    class Arguments:
         tags = graphene.List(graphene.String)

    def mutate(root, info, tags):        
        for tag in tags :
            tag_object = Tags.objects.get(name=tag)
            unfo.context.user.tags.add(tag_object)
### main mutation
class UserMutation(graphene.ObjectType):
    add_member = MembersMutation.Field()
    add_tags_to_user = addTagsToUserMutation.Field()


### main query
class Query(graphene.ObjectType):
    all_members = graphene.List(MembersType)
    all_tags = graphene.List(TagsType)
    get_user_notifications_unread = graphene.List(NotificationsType)
    
    def resolve_all_members(root, info):
        return Member.objects.all()

    def resolve_all_tags(root, info):
        return Tags.objects.all()

    @login_required
    def resolve_get_user_notifications_unread(root, info):
        print(Member.objects.get(id=info.context.user.pk).notifications.unread())
        return Member.objects.get(id=info.context.user.pk).notifications.unread()