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
        # Item.objects(restaurant_id=restaurant_id).delete()
        Restaurant.objects(id=restaurant_id).delete()
        return Response("Restaurant Deleted successfully", status=200)
    except:
        return Response("Couldn't delete the restaurant with restaurant_id {}".format(restaurant_id), status=406)


@api_view(['POST'])
def add_item(request):
    try:
        new_item = Item()
        params = json.loads(request.body)
        new_item.name = params['name']
        new_item.description = params['description']
        new_item.item_image = params['image_url']
        new_item.is_veg = params['is_veg']
        new_item.avail_quantity = params['quantity']
        new_item.restaurant_id = Restaurant.objects.get(id=params['r_id'])
        new_item.save()
        return Response("Item Added successfully", status=200)
    except:
        return Response("Couldn't add the item.", status=406)


@api_view(['DELETE'])
def delete_item(request):
    item_id = request.GET.get('item_id')
    try:
        Item.objects(item_id=item_id).delete()
        return Response("Item Deleted successfully", status=200)
    except:
        return Response("Couldn't delete the item with item_id {}".format(item_id), status=406)


@api_view(['POST'])
def add_item(request):
    try:
        params = json.loads(request.body)
        Item.objects(item_id=params['item_id']).update_one(params)
        return Response("Item updated successfully", status=200)
    except:
        return Response("Couldn't update the item.", status=406)
