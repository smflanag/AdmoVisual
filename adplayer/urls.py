from django.conf.urls import url,include
from rest_framework.urlpatterns import format_suffix_patterns
from adplayer import views

from adplayer.views import PlaylistViewSet, VideoViewSet, ImpressionViewSet

playlist_list = PlaylistViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
playlist_videos = PlaylistViewSet.as_view({
    'get': 'get_current',
})
playlist_detail = PlaylistViewSet.as_view({
    'get': 'get_specific',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
video_list = VideoViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
video_detail = VideoViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
impression_list = ImpressionViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
impression_detail = ImpressionViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    #url(r'^playlists/$', views.playlist_list),
    #url(r'^playlists/$', views.PlaylistList.as_view()),
    url(r'^playlists$', playlist_list, name='playlist_list'),
    url(r'^playlist/current$', playlist_videos, name='playlist_videos'),
    #url(r'^playlist_for_player/(?P<pk>[0-9]+)/$',views.playlist_detail),
    #url(r'^playlist_for_player/(?P<pk>[0-9]+)/$',views.PlaylistDetail.as_view()),
    url(r'^playlist_for_player/(?P<pk>[0-9]+)$', playlist_detail, name='playlist_detail'),
    #url(r'^videos/$', views.videos_list),
    #url(r'^videos/$', views.VideoList.as_view()),
    url(r'^videos$', video_list, name='video_list'),
    #url(r'^videos/(?P<pk>[0-9]+)/$', views.video_detail),
    #url(r'^videos/(?P<pk>[0-9]+)/$', views.VideoDetail.as_view()),
    url(r'^videos/(?P<pk>[0-9]+)$', video_detail, name='video_detail'),
    #url(r'^impressions/$',views.impression_list),
    #url(r'^impressions/$',views.ImpressionList.as_view()),
    url(r'^impressions$', impression_list, name='impression_list'),
    #url(r'^impression/(?P<pk>[0-9]+)/$',views.impression_detail),
    #url(r'^impression/(?P<pk>[0-9]+)/$',views.ImpressionDetail.as_view()),
    url(r'^impression/(?P<pk>[0-9]+)$', impression_detail, name='impression_detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
