from django.conf.urls import url,include
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from adplayer import views
from adplayer.views import PlaylistViewSet, VideoViewSet, ImpressionAddSet, ImpressionViewSet


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

impression_list = ImpressionViewSet.as_view({
    'get': 'list',
    'post': 'create'
})


router = DefaultRouter()
router.register('playlists', views.PlaylistViewSet, 'playlists')
router.register('videos', views.VideoViewSet, 'videos')
router.register('impressions', views.ImpressionAddSet, 'impressions')
router.register('players', views.PlayerViewSet, 'players')


urlpatterns = [
    url(r'^playlist/current$', playlist_videos, name='playlist_videos'),
    url(r'^playlist_for_player/(?P<pk>[0-9]+)$', playlist_detail, name='playlist_detail'),
    url(r'^impressions$', views.ImpressionViewSet.as_view({
        'get': 'list',
        'post': 'create'
            }), name='impression_list'),
]

from .api import  RegistrationAPI, LoginAPI, UserAPI
from rest_framework.authtoken import views
urlpatterns += [
    url(r'^api-token-auth/', views.obtain_auth_token),
    path('rest-auth/', include('rest_auth.urls')),
    url(r'^api/auth/register/$', RegistrationAPI.as_view()),
    url(r'^api/auth/login/$', LoginAPI.as_view()),
    url(r'^api/auth/user/$', UserAPI.as_view()),
    url(r'^api/auth/', include('knox.urls')),
    url(r'^api/', include(router.urls))
]

