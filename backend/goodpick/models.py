from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, username, email, password, name, **kwargs):
        if password is None:
            raise TypeError('Users must have a password.')
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')
        if name is None:
            raise TypeError('Users must have an name.')

        user = self.model(username=username, email=self.normalize_email(email), name=name)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password, name):
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')
        if name is None:
            raise TypeError('Superusers must have an name.')

        user = self.create_user(username, email, password, name)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=64)
    username = models.CharField(max_length=32, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    userImage = models.ImageField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password', 'name']

    objects = UserManager()
    def __str__(self):
        return f"{self.username} ({self.email})"

class Category(models.Model):
    goodsCategoryID = models.AutoField(primary_key=True)
    goodsCategoryName= models.CharField(max_length=64)

    def __str__(self):
        return f"{self.goodsCategoryName}"

class Goods(models.Model):
    goodsID = models.AutoField(primary_key=True)
    goodsCreateId = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsName = models.CharField(max_length=64)
    goodsCategoryID = models.ForeignKey(Category, on_delete=models.CASCADE)
    goodsDescription = models.CharField(max_length=200, null=True, blank=True)
    goodsPrice = models.IntegerField()
    goodsStatus = models.BooleanField(default=False)
    goodsLocation = models.CharField(max_length=64)
    goodsUpdatedTime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.goodsName} ({self.goodsPrice})"

class GoodsImage(models.Model):
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True)
    isMain = models.BooleanField()

class Order(models.Model):
    class OrderKey:
        uniqueOrder = (('userID', 'goodsID'),)

    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    orderStatus = models.BooleanField()
    orderTransactionTime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.orderStatus} ({self.orderTransactionTime})"


class Rating(models.Model):
    class RatingKey:
        uniqueRating = (('userID', 'goodsID'),)

    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    ratingScore = models.IntegerField()

    def __str__(self):
        return f"{self.ratingScore}"


class Comment(models.Model):
    class CommentKey:
        uniqueComment = (('userID', 'goodsID'),)

    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    commentContent = models.CharField(max_length=200)
    commentTime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.commentContent} ({self.commentTime})"


class Chat(models.Model):
    class ChatKey:
        uniqueComment = (('userID', 'goodsID'),)

    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    chatContent = models.CharField(max_length=200)
    chatTime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.chatContent} ({self.chatTime})"
