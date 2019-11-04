from django.db import models

class Project(models.Model):
    repo_name = models.TextField()
    ver_num = models.CharField(max_length=100)
    link = models.URLField()
    repo_size = models.PositiveSmallIntegerField()
    prog_lang = models.CharField(max_length=100)
    description = models.TextField(default="")

    def __str__(self):
        return self.repo_name

    class Meta:
        db_table = 'projects'
        ordering = ('repo_name',)

class Task(models.Model):
    description = models.TextField()
    state = models.PositiveSmallIntegerField()
    complexity = models.PositiveSmallIntegerField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.description

    class Meta:
        db_table = 'tasks'

class Doc(models.Model):
    content = models.TextField()
    rating = models. PositiveSmallIntegerField()
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return self.content

    class Meta:
        db_table = 'docs'