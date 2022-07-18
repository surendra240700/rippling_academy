from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# import pymongo
from rest_framework.decorators import api_view
import json
from food_ordering_app.models import Restaurant, Item
from typing import List, Dict
from food_ordering_app.serializers import RestaurantSerializer, ItemSerializer
from rest_framework.response import Response


@api_view(['GET'])
def home(request):
    return HttpResponse('<h1>Hello and welcome to my food ordering app project!</h1>')


@api_view(['GET'])
def get_restaurants(request):
    restaurants = Restaurant.objects.all()
    serializer = RestaurantSerializer(restaurants, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_restaurant(request):
    try:
        new_restaurant = Restaurant()
        params = json.loads(request.body)
        new_restaurant.name = params["name"]
        new_restaurant.cuisines = params["cuisines"]
        new_restaurant.address = params["address"]
        new_restaurant.logo = params["logo"]
        print("hi")
        new_restaurant.save()
        return Response(
            "restaurant created with name {} and address {}".format(new_restaurant.name, new_restaurant.address),
            status=200)

    except:
        return HttpResponse('<h1> parameters missing. Need name, address, cuisines, logo.</h1>', status=406)


@api_view(['DELETE'])
def delete_restaurant(request):
    restaurant_id = request.GET.get('r_id')
    try:
        Item.objects(restaurant_id=restaurant_id).delete()
        Restaurant.objects(id=restaurant_id).delete()
        return Response("Restaurant Deleted successfully", status=200)
    except:
        return Response("Couldn't delete the restaurant with restaurant_id {}".format(restaurant_id), status=406)

def add_item(request):
    pass