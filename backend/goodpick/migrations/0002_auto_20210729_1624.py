# Generated by Django 3.2.5 on 2021-07-29 16:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('goodpick', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('goodsCategoryID', models.AutoField(primary_key=True, serialize=False)),
                ('goodsCategoryName', models.CharField(max_length=64)),
            ],
        ),
        migrations.RemoveField(
            model_name='goods',
            name='goodsCategory',
        ),
        migrations.RemoveField(
            model_name='goods',
            name='goodsPostedTime',
        ),
        migrations.AddField(
            model_name='user',
            name='userImage',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='chat',
            name='chatTime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='commentTime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='goods',
            name='goodsUpdatedTime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='orderTransactionTime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='goods',
            name='goodsCategoryID',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='goodpick.category'),
        ),
    ]
