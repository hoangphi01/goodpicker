from django.contrib import admin
from .models import ProductImage, User, Goods, Order, Rating, Comment, Chat, Category

admin.site.site_header = "Trang trao đổi hàng hoá GoodsPicker"
admin.site.site_title = "Trang trao đổi hàng hoá GoodsPicker"

# Register your models here.
admin.site.register(User)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Goods)
admin.site.register(Order)
admin.site.register(Rating)
admin.site.register(Comment)
admin.site.register(Chat)
