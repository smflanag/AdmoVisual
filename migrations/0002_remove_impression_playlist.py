# Generated by Django 2.0.1 on 2019-02-20 14:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adplayer', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='impression',
            name='playlist',
        ),
    ]
