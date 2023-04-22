from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    
# Esto es para ver el title en las tareas desde el /admin
    def __str__(self):
        return self.title

