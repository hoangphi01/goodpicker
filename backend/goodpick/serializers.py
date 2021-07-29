from rest_framework import serializers
# from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import User
from .models import Goods
from .models import Order
from .models import Rating
from .models import Comment
from .models import Chat

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'name')

#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'], validated_data['name'])

        return user

#Login Serializer
class LoginSerializer(serializers.Serializer):
  email = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")

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
