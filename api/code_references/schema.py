import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from .models import Project, Task, Doc

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project

class TaskType(DjangoObjectType):
    class Meta:
        model = Task

class DocType(DjangoObjectType):
    class Meta:
        model = Doc

class ProjectInput(graphene.InputObjectType):
    id = graphene.ID()
    repo_name = graphene.String()
    ver_num = graphene.String()
    link = graphene.String()
    repo_size = graphene.Int()
    prog_lang = graphene.String()
    description = graphene.String()

class TaskInput(graphene.InputObjectType):
    id = graphene.ID()
    description = graphene.String()
    state = graphene.Int()
    complexity = graphene.Int()
    project = graphene.Field(ProjectInput)

class DocInput(graphene.InputObjectType):
    id = graphene.ID()
    content = graphene.String()
    rating = graphene.Int()
    task = graphene.Field(TaskInput)

class CreateProject(graphene.Mutation):
    class Arguments:
        input = ProjectInput(required=True)

    project = graphene.Field(ProjectType)

    def mutate(self, info, input=None):
        project_instance = Project(repo_name = input.repo_name,
                                    ver_num = input.ver_num,
                                    link = input.link,
                                    repo_size = input.repo_size,
                                    prog_lang = input.prog_lang,
                                    description = input.description)
        project_instance.save()
        return CreateProject(project = project_instance)

class UpdateProject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = ProjectInput(required=True)

    project = graphene.Field(ProjectType)

    def mutate(self, info, id, input=None):
        project_instance = Project.objects.get(pk=id)
        if project_instance:
            project_instance.repo_name = input.repo_name
            project_instance.ver_num = input.ver_num
            project_instance.link = input.link
            project_instance.repo_size = input.repo_size
            project_instance.prog_lang = input.prog_lang
            project_instance.description = input.description
            project_instance.save()
            
            return UpdateProject(project = project_instance)
        return UpdateProject(project = None)

class CreateTask(graphene.Mutation):
    class Arguments:
        input = TaskInput(required=True)

    task = graphene.Field(TaskType)

    def mutate(self, info, input=None):
        proj = Project.objects.get(pk=input.project.id)
        if proj is None:
            return CreateTask(task=None)

        task_instance = proj.task_set.create(description = input.description,
                             state = input.state,
                             complexity = input.complexity)

        return CreateTask(task=task_instance)

class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = TaskInput(required=True)

    task = graphene.Field(TaskType)

    def mutate(self, info, id, input=None):
        task_instance = Task.objects.get(pk=id)
        if task_instance:
            proj = Project.objects.get(pk=input.project.id)
            if proj is None:
                return UpdateTask(task=None)
            task_instance.description = input.description
            task_instance.state = input.state
            task_instance.complexity = input.complexity
            task_instance.save()
            proj.task_set.add(task_instance)

            return UpdateTask(task = task_instance)
        return UpdateTask(task=None)

class CreateDoc(graphene.Mutation):
    class Arguments:
        input = DocInput(required=True)
    
    doc = graphene.Field(DocType)

    def mutate(self, info, input=None):
        task = Task.objects.get(pk=input.task.id)
        if task is None:
            return CreateDoc(doc=None)

        doc_instance = task.doc_set.create(content = input.content,
                                           rating = input.rating)

        return CreateDoc(doc=doc_instance)

class UpdateDoc(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = DocInput(required=True)

    doc = graphene.Field(DocType)

    def mutate(self, info, id, input=None):
        doc_instance = Doc.objects.get(pk=id)
        if doc_instance:
            task = Task.objects.get(pk=input.task.id)
            if task is None:
                return UpdateDoc(doc=None)
            doc_instance.content = input.content
            doc_instance.rating = input.rating
            doc_instance.save()
            task.doc_set.add(doc_instance)

            return UpdateDoc(doc = doc_instance)
        return UpdateDoc(doc=None)

class Query(graphene.ObjectType):
    project = graphene.Field(ProjectType, id=graphene.Int())
    task = graphene.Field(TaskType, id=graphene.Int())
    doc = graphene.Field(DocType, id=graphene.Int())
    projects = graphene.List(ProjectType)
    tasks = graphene.List(TaskType, search=graphene.Int())
    docs = graphene.List(DocType)

    def resolve_project(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Project.objects.get(pk=id)

        return None

    def resolve_task(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Task.objects.get(pk=id)

        return None

    def resolve_doc(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Doc.objects.get(pk=id)

        return None

    def resolve_projects(self, info, **kwargs):
        return Project.objects.all()

    def resolve_tasks(self, info, search=None, **kwargs):
        if search:
            filter = (
                Q(state__icontains=search)
            )
            return Task.objects.filter(filter)
        return Task.objects.all()

    def resolve_docs(self, info, **kwargs):
        return Doc.objects.all()

class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
    update_project = UpdateProject.Field()
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    create_doc = CreateDoc.Field()
    update_doc = UpdateDoc.Field()
