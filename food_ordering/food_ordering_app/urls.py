from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('restaurants', views.get_restaurants, name='restaurants'),
    path('add_restaurant', views.add_restaurant, name='add_restaurant'),
    path('delete_restaurant', views.delete_restaurant, name='delete_restaurant'),
    path('add_item', views.add_item, name='add_item'),
    path('delete_item', views.delete_item, name='delete_item'),
]
