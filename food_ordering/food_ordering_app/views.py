from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import pymongo
from rest_framework.decorators import api_view
import json

# Create your views here.
connection_string = 'mongodb+srv://surendra:surendra@food-ordering.eqa1wnc.mongodb.net/?retryWrites=true&w=majority'
client = pymongo.MongoClient(connection_string)
dbname = client['sample_food_ordering']

restaurants = dbname['restaurants']


@api_view(['GET'])
def home(request):
    return HttpResponse('<h1>Hello and welcome to my food ordering app project!</h1>')


@api_view(['GET'])
def get_restaurants(request):
    res_details = restaurants.find({})
    list_out = []
    for r in res_details:
        obj = {'restaurant_name': r['restaurant_name'], 'restaurant_id': r['restaurant_id'],
               'mobile_number': r['mobile_number']}
        list_out.append(obj)
    # json_out = json.dumps([ob for ob in list_out])
    return JsonResponse(list_out, safe=False)


@api_view(['POST'])
def add_restaurant(request):
    try:
        new_restaurant = {'restaurant_name': request.POST['restaurant_name'],
                          'mobile_number': request.POST['mobile_number'], 'address': request.POST['address'],
                          'logo': request.POST['logo']}
        restaurants.insert_one(new_restaurant)
        return HttpResponse(status=200)
    except:
        return HttpResponse('<h1> parameters missing</h1>', status=406)
# def add_restaurant

# restaurant_1 = {
#     "restaurant_id": "r1",
#     "restaurant_name": "biryani_zone",
#     "mobile_number": 1234567890,
# }

# restaurant_2 = {
#     "restaurant_id": "r2",
#     "restaurant_name": "cake_zone",
#     "mobile_number": 1234567809,
# }
# restaurants.insert_many([restaurant_1, restaurant_2])


# count = restaurants.count()
# print(count)
