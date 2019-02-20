from rest_framework import serializers
from adplayer.models import Playlist,Player,Video,Impression

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ('name', 'id')


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('name', 'url', 'playlist', 'id')


class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ('name', 'id')


class ImpressionViewSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)
    video = VideoSerializer(read_only=True)
    playlist = PlaylistSerializer(read_only=True)

    class Meta:
        model = Impression
        fields = ('timestamp','player','video','playlist', 'id')


class ImpressionAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Impression
        fields = ('timestamp','player','video','playlist', 'id')

