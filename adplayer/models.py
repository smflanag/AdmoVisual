from django.db import models

from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# token = Token.objects.create(user=User)
# print(token.key)
#
# from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token
#
# for user in User.objects.all():
#     Token.objects.get_or_create(user=user)

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Playlist(models.Model):
    name = models.CharField(max_length=126)


    def __str__(self):
        return self.name


class Video(models.Model):
    name = models.CharField(max_length=126)
    url = models.URLField(unique=True)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)

    def __str__(self):
        return self.name





class Player(models.Model):
    name = models.CharField(max_length=126)
    #playlist = models.ForeignKey(Playlist,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Impression(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist,on_delete=models.CASCADE)
    #gender? List of options
    #eg
    # YEAR_IN_SCHOOL_CHOICES = (
    #     ('FR', 'Freshman'),
    #     ('SO', 'Sophomore'),
    #     ('JR', 'Junior'),
    #     ('SR', 'Senior'),
    # )
    # year_in_school = models.CharField(
    #     max_length=2,
    #     choices=YEAR_IN_SCHOOL_CHOICES,
    #     default=FRESHMAN,
    # )
    #duration? DurationField(**options)

