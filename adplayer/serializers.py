from rest_framework import serializers
from adplayer.models import Playlist,Player,Video,Impression

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ('name',)


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('name', 'url', 'playlist', 'id')

class PlayerSerializer(serializers.ModelSerializer):
    playlist = serializers.CharField(source='playlist.id', read_only=True)  ##?
    class Meta:
        model = Player
        fields = ('name', 'playlist')

class ImpressionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Impression
        fields = ('timestamp','player','video','playlist', 'id')



## note to self: necessary to have serializers for each model represented?
## do they require fields to mirror each ForeignKey link?

