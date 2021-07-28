gitfrom django.db import models
from datetime import datetime


# Create your models here.
class User(models.Model):
    userID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64)
    accountName = models.CharField(max_length=32)
    userPassword = models.CharField(max_length=32)
    userEmail = models.EmailField(max_length=100)

    def __str__(self):
        return f"{self.accountName} ({self.userEmail})"


class Goods(models.Model):
    goodsID = models.AutoField(primary_key=True)
    goodsCreateId = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsName = models.CharField(max_length=64)
    goodsCategory = models.CharField(max_length=64)
    goodsDescription = models.CharField(max_length=200)
    goodsPrice = models.IntegerField()
    goodsStatus = models.BooleanField()
    goodsLocation = models.CharField(max_length=64)
    goodsPostedTime = models.TimeField(auto_now=True)
    goodsUpdatedTime = models.TimeField(auto_now=True)

    def __str__(self):
        return f"{self.goodsName} ({self.goodsPrice})"


class Order(models.Model):
    class OrderKey:
        uniqueOrder = (('userID', 'goodsID'),)

    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    orderStatus = models.BooleanField()
    orderTransactionTime = models.TimeField(auto_now=True)

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
    commentTime = models.TimeField(auto_now=True)

    def __str__(self):
        return f"{self.commentContent} ({self.commentTime})"


class Chat(models.Model):
    class ChatKey:
        uniqueComment = (('userID', 'goodsID'),)

    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    chatContent = models.CharField(max_length=200)
    chatTime = models.TimeField(auto_now=True)

    def __str__(self):
        return f"{self.chatContent} ({self.chatTime})"
