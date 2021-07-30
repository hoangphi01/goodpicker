from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .serializers import GoodsSerializer
from .serializers import OrderSerializer
from .serializers import RatingSerializer
from .serializers import CommentSerializer
from .serializers import ChatSerializer
from .serializers import CategorySerializer
from .serializers import ProductImageSerializer
from .models import User
from .models import Goods
from .models import Order
from .models import Rating
from .models import Comment
from .models import Chat
from .models import Category
from .models import ProductImage

# Create your views here.


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class ProductImageView(viewsets.ModelViewSet):
    serializer_class = ProductImageSerializer
    queryset = ProductImage.objects.all()

class GoodsView(viewsets.ModelViewSet):
    serializer_class = GoodsSerializer
    queryset = Goods.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['goodsCategoryID', 'goodsStatus']
    ordering_fields = ['goodsUpdatedTime']


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class ChatView(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

