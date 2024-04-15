from django.shortcuts import render
from .serializers import TodoItemSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import TodoItem
from .utils import getTask, updateTask, completedTask, deleteTask, addTask
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    
 routes = [
        {
            'Endpoint': '/tasks/',
            'method': 'GET',
            'task': None,
            'description': 'Returns an array of tasks'
        },
        {
            'Endpoint': '/tasks/add/',
            'method': 'POST',
            'task': {'task': ""},
            'description': 'Creates new task with data sent in post request'
        },
        {
            'Endpoint': '/tasks/id/update/',
            'method': 'PUT',
            'task': {'task': ""},
            'description': 'Creates an existing task with data sent in post request'
        },
        {
            'Endpoint': '/tasks/id/delete/',
            'method': 'DELETE',
            'task': None,
            'description': 'Deletes and exiting task'
        },
    ]
 return Response(routes)

# /tasks GET
# /tasks POST
# /tasks/<id> GET
# /tasks/<id> PUT
# /tasks/<id> DELETE

@api_view(['GET', 'POST'])
def getTasks(request):

    if request.method == 'GET':
        return getTask(request)

    if request.method == 'POST':
        return addTask(request)

@api_view(['GET', 'PUT', 'DELETE'])
def getTodo(request, pk):

    if request.method == 'GET':
        return getTask(request, pk)

    if request.method == 'PUT':
        return updateTask(request, pk)

    if request.method == 'DELETE':
        return deleteTask(request, pk)