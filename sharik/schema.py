import graphene

from graphql_auth.schema import UserQuery, MeQuery

from api.schemas import EventMutation , Query as EventQuery, UserMutation

from graphql_auth import mutations

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()

class Query(UserQuery, EventQuery, MeQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, EventMutation, graphene.ObjectType):
   pass

schema = graphene.Schema(query=Query, mutation=Mutation)