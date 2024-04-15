import time
from django.db import models

# Create your models here.

class TodoItem(models.Model):
    text = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.text