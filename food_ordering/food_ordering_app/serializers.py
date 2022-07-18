from rest_framework_mongoengine import serializers
from food_ordering_app.models import Restaurant, Item


class RestaurantSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class ItemSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Item
        fields = '__all__'
