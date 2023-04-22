# Backend en python django.
El proyecto es un crud con djando como backend en python y react como fronted.

# Lista de comandos
conda create -n crud
conda activate crud

conda install python=3.9
conda install django
django-admin startproject django_crud_api . # El punto del final permite que el manage.py quede en la raiz del proyecto.
python manage.py runserver # levanta en http://localhost:8080


En ./django_crud_api/settings.py es basicamente donde se configura todo el proyecto y se agrega una aplicacion con el comando:


python manage.py startapp task  # startapp es para iniciar una aplicacion y de nombre "task" y esto crea la carpeta tasks y agregamos en settings.py la INSTALLED_APPS al final del array 'task'

Como la app va a necesitar un modelo necesitamos crear las tablas que necesita el proyecto para funcionar con el siguiente comando:
python manage.py migrate

# install django rest framework
conda install djangorestframework

para conectar frontend con backend se debe instalar lo siguiente con el modulo django-cors-headers

conda install django-cors-headers

ahora se agrega en settings.py --> INSTALLED_APPS --> estas 2 lineas:
'corsheaders',
'rest_framework',


Ahora se agrega en settings.py --> MIDDLEWARE --> esta linea antes de middleware.common
'corsheaders.middleware.CorsMiddleware',


Luego al final del settings.py --> se agrega esta linea, que luego se utiliza para autorizar a un socket a conectarse
CORS_ALLOWED_ORIGINS = []

# Crear tabla para guardar las tareas que vamos cargando
Para esto no es necesario ejecutar codigo SQL porque django ya tiene su propio ORM y se configura desde task/models.py

agregamos esto al ginal del archivo ./task/models.py
    ´´´
# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    ´´´

Ejecutamos el comando para crear las migraciones
python manage.py makemigrations

luego corremos las migraciones con el siguiente comando, esto en db.sqlite3
python manage.py migrate task

Ahora creamos un usuario para ingresar a admin --> http://127.0.0.1:8000/admin
python manage.py createsuperuser
solicita usuario, mail y contraseña / admin - lsoria@autheracloud.com / admin

Para verlo del panel admin se debe agregar en task/admin.py lo siguiente:

from .models import Tasks
# Register your models here.
admin.site.register(Tasks)


-----
Ahora vamos a crear nuestra API para gestionar las tareas ya que el objetivo no es agregar tareas desde el panel de /admin

Lo primero es decirle a nuestro modelo "TASKS" que datos van a ser seleccionado para que se pueden enviar desde el Backend y puedan ser convertidos a un JSON.
Ya que cuando se guardan datos en Python o DJANGO los mismos son serealizados en objetos y luego son convertidos a los que se llama un QuerySet que es un tipo de datos completo basado en lo que crea DJANGO 

Esto Django lo hace por nosotros pero debemos seleccionar los campos son para poder serealizar en objetos --> datos django complejo

Datos del modelo: JSON --> Serealizado en objetos --> datos complejo Django para esto creamos el archivo "serealizer.py"



