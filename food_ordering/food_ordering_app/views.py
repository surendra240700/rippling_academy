from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# import pymongo
from rest_framework.decorators import api_view
import json
from food_ordering_app.models import Restaurant, Item
from typing import List, Dict
from food_ordering_app.serializers import RestaurantSerializer, ItemSerializer
from rest_framework.response import Response


def check_params(expected: Dict, received: Dict) -> bool:
    for key in expected:
        if key not in received:
            return False
    return True


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
    # try:
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
    #
    # except:
    #     return HttpResponse('<h1> parameters missing. Need name, address, cuisines, logo.</h1>', status=406)


@api_view(['DELETE'])
def delete_restaurant(request, pk):
    Item.objects(restaurant_id=pk).delete()
    Restaurant.objects(id=pk).delete()
    return Response("Restaurant Deleted successfully")


@api_view(['GET'])
def get_restaurant_by_ID(request, pk):
    try:
        try:
            restaurant_by_ID = Restaurant.objects.get(id=pk)
            return Response(RestaurantSerializer(restaurant_by_ID, many=False).data, status=200)
        except Restaurant.DoesNotExist:
            return Response("No such restaurant exist.", status=200)

    except:
        return Response("Some error occurred", status=500)