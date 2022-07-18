from django.db import models
from mongoengine import *


class User(Document):
    email = EmailField(required=True, unique=True)
    auth_token = StringField(required=True)


# Create your models here.
class Restaurant(Document):
    name = StringField(max_length=20, required=True)
    address = StringField(max_length=50, required=True)
    logo = StringField()
    cuisines = ListField(StringField())


class Item(Document):
    name = StringField(max_length=20, required=True)
    description = StringField()
    item_image = URLField()
    is_veg = BooleanField()
    avail_quantity = IntField()
    avail_times = ListField(StringField())  # Breakfast/Lunch/Dinner
    restaurant_id = ReferenceField(Restaurant, reverse_delete_rule=CASCADE, required=True)
