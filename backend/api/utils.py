from rest_framework.response import Response
from .models import TodoItem
from .serializers import TodoItemSerializer

def getTask(request):
 tasks = TodoItem.objects.all()
 serializer = TodoItemSerializer(tasks, many=True)
 return Response(serializer.data)

def updateTask(request, pk):
    data = request.data
    task = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(instance=task, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

def completedTask(request, pk):
    task = TodoItem.objects.get(id=pk)
    task.completed = not task.completed
    task.save()

    serializer = TodoItemSerializer(task)
    return Response(serializer.data)

def deleteTask(request, pk):
    task = TodoItem.objects.get(id=pk)
    task.delete()
    return Response('Task was deleted!')

def addTask(request):
    data = request.data
    task = TodoItem.objects.create(
        text=data['text']
    )
    serializer = TodoItemSerializer(task, many=False)
    return Response(serializer.data)

