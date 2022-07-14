from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('restaurants', views.get_restaurants, name='restaurants'),
    path('add_restaurant', views.add_restaurant, name='add_restaurant'),
]
