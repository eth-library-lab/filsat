import graphene
import django_filters
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Project, Task, Doc

class CodeReferenceFilter(django_filters.FilterSet):
    class Meta:
        model = CodeReference
        fields = ['proj_name', 'file_name', 'ver_num', 'link', 'prog_lang']

class CodeReferenceNode(DjangoObjectType):
    class Meta:
        model = CodeReference
        interfaces = (graphene.relay.Node, )

class RelayQuery(graphene.ObjectType):
    relay_CodeReference = graphene.relay.Node.Field(CodeReferenceNode)
    relay_codes = DjangoFilterConnectionField(CodeReferenceNode, filterset_class=CodeReferenceFilter)

class RelayCreateCodeReference(graphene.relay.ClientIDMutation):
    code_reference = graphene.Field(CodeReferenceNode)

    class Input:
        proj_name = graphene.String()
        file_name = graphene.String()
        ver_num = graphene.String()
        link = graphene.String()
        prog_lang = graphene.String()
        difficulty = graphene.Int()

    def mutate_and_get_payload(self, info, **input):
        code_reference = CodeReference(
            proj_name=input.get('proj_name'),
            file_name=input.get('file_name'),
            ver_num=input.get('ver_num'),
            link=input.get('link'),
            prog_lang=input.get('prog_lang'),
            difficulty=input.get('difficulty')
        )
        code_reference.save()

        return RelayCreateCodeReference(code_reference=code_reference)

class RelayMutation(graphene.AbstractType):
    relay_create_code_reference = RelayCreateCodeReference.Field()

