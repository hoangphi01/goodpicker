from rest_framework import serializers
from .models import User
from .models import Goods
from .models import Order
from .models import Rating
from .models import Comment
from .models import Chat


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userID', 'name', 'accountName', 'userPassword', 'userEmail')


class GoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = ('goodsID', 'goodsCreateId', 'goodsName', 'goodsCategory', 'goodsDescription', 'goodsPrice',
                  'goodsStatus', 'goodsLocation', 'goodsPostedTime', 'goodsUpdatedTime')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('userID', 'goodsID', 'orderStatus', 'orderTransactionTime')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('userID', 'goodsID', 'ratingScore')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('userID', 'goodsID', 'commentContent', 'commentTime')


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('userID', 'goodsID', 'chatContent', 'chatTime')
