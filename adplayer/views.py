from adplayer.models import Player,Playlist,Video,Impression
from adplayer.serializers import PlayerSerializer,PlaylistSerializer,VideoSerializer,ImpressionSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def playlist_list(request):
    """
    List playlists.
    """
    if request.method == 'GET':
        playlists = Playlist.objects.all()
        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def videos_list(request):
    """
    List playlists.
    """
    if request.method == 'GET':
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def playlist_detail(request, pk):
    """
    Retrieve playlist details.
    """
    try:
        playlist = Playlist.objects.get(pk=pk)
    except Playlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlaylistSerializer(playlist)
        return Response(serializer.data)

@api_view(['GET'])
def video_detail(request, pk):
    """
    Retrieve video details.
    """
    try:
        video = Video.objects.get(pk=pk)
    except Video.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VideoSerializer(video)
        return Response(serializer.data)




@api_view(['GET', 'POST'])
def impression_list(request):
    """
    List all impressions.
    """

    ##modify to remove GET options?
    if request.method == 'GET':
        impressions = Impression.objects.all()
        serializer = ImpressionSerializer(impressions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ImpressionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def impression_detail(request, pk):
    """
    Retrieve, update or delete impressions.
    """
    try:
        impression = Impression.objects.get(pk=pk)
    except Impression.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ImpressionSerializer(impression)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ImpressionSerializer(impression, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        impression.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


