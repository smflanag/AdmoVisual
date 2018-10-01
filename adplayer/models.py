from django.db import models

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

