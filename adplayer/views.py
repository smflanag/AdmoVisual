from adplayer.models import Player,Playlist,Video,Impression
from adplayer.serializers import PlayerSerializer,PlaylistSerializer,VideoSerializer,ImpressionViewSerializer, ImpressionAddSerializer


from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import renderers, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class PlaylistViewSet(viewsets.ModelViewSet):

    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    # permission_classes = (IsAuthenticated,)
    # authentication_classes = (TokenAuthentication,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True,renderer_classes=[renderers.StaticHTMLRenderer])
    def get_specific(self, request, pk, format=None):
        playlist = Video.objects.filter(playlist_id=pk)
        total_playlist = []
        for obj in playlist:
            serializer = VideoSerializer(obj)
            total_playlist.append(serializer.data)
        return Response(total_playlist)

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def get_current(self, request):
        playlist = Playlist.objects.all()[len(Playlist.objects.all())-1] #gives last playlist
        playlist_videos = Video.objects.filter(playlist_id=playlist)
        total_playlist = []
        for obj in playlist_videos:
            serializer = VideoSerializer(obj)
            total_playlist.append(serializer.data)
        return Response(total_playlist)


class VideoViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        return Video.objects.all()
    serializer_class = VideoSerializer

    # permission_classes = [permissions.IsAuthenticated, ]
    # removed for CRUD in UI

    # def get_queryset(self):
    #     return self.request.user.videos.all()

    def perform_create(self, serializer):
        serializer.save()


class ImpressionViewSet(viewsets.ModelViewSet):

    queryset = Impression.objects.all()
    serializer_class = ImpressionViewSerializer


class ImpressionAddSet(viewsets.ModelViewSet):

    queryset = Impression.objects.all()
    serializer_class = ImpressionAddSerializer


class PlayerViewSet(viewsets.ModelViewSet):

    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

