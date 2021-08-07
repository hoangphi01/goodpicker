from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from django.shortcuts import render
from knox.auth import TokenAuthentication
from .serializers import UserSerializer
from .serializers import GoodsSerializer
from .serializers import OrderSerializer
from .serializers import RatingSerializer
from .serializers import CommentSerializer
from .serializers import ChatSerializer
from .serializers import CategorySerializer
from .serializers import GoodsImageSerializer
from .models import User
from .models import Goods
from .models import Order
from .models import Rating
from .models import Comment
from .models import Chat
from .models import Category
from .models import GoodsImage
from .permissions import ReadOnly

# Create your views here.


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class GoodsImageView(viewsets.ModelViewSet):
    serializer_class = GoodsImageSerializer
    queryset = GoodsImage.objects.all()

class GoodsView(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated|ReadOnly]
    serializer_class = GoodsSerializer
    pagination_class = LimitOffsetPagination
    queryset = Goods.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = {
        'goodsCategoryID': ['exact'],
        'goodsStatus': ['exact'],
        'goodsPrice': ['gte', 'lte'],
        'goodsLocation': ['exact'],
        'goodsUpdatedTime': ['gte', 'lte']
    }
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

