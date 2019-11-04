import graphene
import code_references.schema

class Query(code_references.schema.Query, graphene.ObjectType):
    pass

class Mutation(code_references.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)