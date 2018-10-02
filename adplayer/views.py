from adplayer.models import Player,Playlist,Video,Impression
from adplayer.serializers import PlayerSerializer,PlaylistSerializer,VideoSerializer,ImpressionSerializer

from rest_framework import mixins, generics
from rest_framework.response import Response


class PlaylistList(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):
    """
    List playlists.
    """
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class VideoList(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):
    """
    List videos.
    """
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class PlaylistDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def get(self, request, pk, format=None):
        playlist = Video.objects.filter(playlist_id=pk)
        total_playlist = []
        for obj in playlist:
            serializer = VideoSerializer(obj)
            total_playlist.append(serializer.data)
        return Response(total_playlist)


class VideoDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class ImpressionList(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):
    """
    List impressions.
    """
    queryset = Impression.objects.all()
    serializer_class = ImpressionSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ImpressionDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Impression.objects.all()
    serializer_class = ImpressionSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


#Class based views
# from django.http import Http404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status


# class PlaylistList(APIView):
#     """
#     List playlists.
#     """
#     def get(self, request, format=None):
#         playlists = Playlist.objects.all()
#         serializer = PlaylistSerializer(playlists, many=True)
#         return Response(serializer.data)


# class VideoList(APIView):
#     """
#     List videos.
#     """
#     def get(self, request, format=None):
#         videos = Video.objects.all()
#         serializer = VideoSerializer(videos, many=True)
#         return Response(serializer.data)


# class PlaylistDetail(APIView):
#     """
#     Retrieve a playlist instance.
#     """
#     def get_object(self, pk):
#         try:
#             return Playlist.objects.get(pk=pk)
#         except Playlist.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         #playlist = self.get_object(pk)
#         playlist = Video.objects.filter(playlist_id=pk)
#         total_playlist = []
#         for obj in playlist:
#             serializer = VideoSerializer(obj)
#             total_playlist.append(serializer.data)
#         return Response(total_playlist)


# class VideoDetail(APIView):
#     """
#     Retrieve a video instance.
#     """
#     def get_object(self, pk):
#         try:
#             return Video.objects.get(pk=pk)
#         except Video.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         video = self.get_object(pk)
#         serializer = VideoSerializer(video)
#         return Response(serializer.data)


# class ImpressionList(APIView):
#     """
#     List all impressions, or create a new impression.
#     """
#     def get(self, request, format=None):
#         impression = Impression.objects.all()
#         serializer = ImpressionSerializer(impression, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = ImpressionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ImpressionDetail(APIView):
#     """
#     Retrieve, update or delete an impression instance.
#     """
#     def get_object(self, pk):
#         try:
#             return Impression.objects.get(pk=pk)
#         except Impression.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         impression = self.get_object(pk)
#         serializer = ImpressionSerializer(impression)
#         return Response(serializer.data)
#
#     def put(self, request, pk, format=None):
#         impression = self.get_object(pk)
#         serializer = ImpressionSerializer(impression, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         impression = self.get_object(pk)
#         impression.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


##function based views
# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.reverse import reverse
#
#
# @api_view(['GET'])
# def playlist_list(request):
#     """
#     List playlists.
#     """
#     if request.method == 'GET':
#         playlists = Playlist.objects.all()
#         serializer = PlaylistSerializer(playlists, many=True)
#         return Response(serializer.data)
#
#
# @api_view(['GET'])
# def videos_list(request):
#     """
#     List videos.
#     """
#     if request.method == 'GET':
#         videos = Video.objects.all()
#         serializer = VideoSerializer(videos, many=True)
#         return Response(serializer.data)
#
#
# @api_view(['GET'])
# def playlist_detail(request, pk):
#     """
#     Retrieve playlist details.
#     """
#     try:
#         playlist = Playlist.objects.get(pk=pk)
#     except Playlist.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         playlist = Video.objects.filter(playlist_id=pk)
#         total_playlist = []
#         for obj in playlist:
#             serializer = VideoSerializer(obj)
#             total_playlist.append(serializer.data)
#         return Response(total_playlist)
#
#
# @api_view(['GET'])
# def video_detail(request, pk):
#     """
#     Retrieve video details.
#     """
#     try:
#         video = Video.objects.get(pk=pk)
#     except Video.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = VideoSerializer(video)
#         return Response(serializer.data)
#
#
# @api_view(['GET', 'POST'])
# def impression_list(request):
#     """
#     List all impressions.
#     """
#
#     ##modify to remove GET options?
#     if request.method == 'GET':
#         impressions = Impression.objects.all()
#         serializer = ImpressionSerializer(impressions, many=True)
#         return Response(serializer.data)
#
#     elif request.method == 'POST':
#         serializer = ImpressionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['GET', 'PUT', 'DELETE'])
# def impression_detail(request, pk):
#     """
#     Retrieve, update or delete impressions.
#     """
#     try:
#         impression = Impression.objects.get(pk=pk)
#     except Impression.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = ImpressionSerializer(impression)
#         return Response(serializer.data)
#
#     elif request.method == 'PUT':
#         serializer = ImpressionSerializer(impression, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == 'DELETE':
#         impression.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
