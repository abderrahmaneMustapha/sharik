from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django import DjangoListField
from ..models import Member,Tag
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

class TagType(DjangoObjectType):
    class Meta:
        model  = Tag
        fields  = '__all__'

class NotificationsType(DjangoObjectType):
    class Meta:
        model = Notification
        fields = '__all__'

########################################
########################################
######################################## Forms Mutations
class MembersMutation(DjangoModelFormMutation):
    member =  graphene.Field(MembersType)
    class Meta:
        form_class = MemberCreationForm


### main mutation
class UserMutation(graphene.ObjectType):
    add_member = MembersMutation.Field()


### main query
class Query(graphene.ObjectType):
    all_members = graphene.List(MembersType)
    get_user_notifications = graphene.List(NotificationsType, id=graphene.ID())

    def resolve_all_members(root, info):
        return Member.objects.all()

    def resolve_get_user_notifications(root, info, id):
        return Member.objects.get(id=id).notifications.unread()