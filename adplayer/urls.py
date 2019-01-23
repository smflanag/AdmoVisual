from django.conf.urls import url,include
from django.urls import path
from rest_framework.routers import DefaultRouter
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
# video_list = VideoViewSet.as_view({
#     'get': 'list',
#     'post': 'create'
# })
# video_detail = VideoViewSet.as_view({
#     'get': 'retrieve',
#     'put': 'update',
#     'patch': 'partial_update',
#     'delete': 'destroy'
# })
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

router = DefaultRouter()
# router.register(r'playlists', views.PlaylistViewSet)
router.register('videos', views.VideoViewSet, 'videos')
# router.register(r'impressions', views.ImpressionViewSet)
#
# urlpatterns = [url(r'^',include(router.urls))]

urlpatterns = [

    #url(r'^playlists/$', views.playlist_list),
    #url(r'^playlists/$', views.PlaylistList.as_view()),

    ##url(r'^playlists$', playlist_list, name='playlist_list'),

    url(r'^playlist/current$', playlist_videos, name='playlist_videos'),

    #url(r'^playlist_for_player/(?P<pk>[0-9]+)/$',views.playlist_detail),
    #url(r'^playlist_for_player/(?P<pk>[0-9]+)/$',views.PlaylistDetail.as_view()),

    url(r'^playlist_for_player/(?P<pk>[0-9]+)$', playlist_detail, name='playlist_detail'),

    #url(r'^videos/$', views.videos_list),
    #url(r'^videos/$', views.VideoList.as_view()),

    ##url(r'^videos$', video_list, name='video_list'),

    #url(r'^videos/(?P<pk>[0-9]+)/$', views.video_detail),
    #url(r'^videos/(?P<pk>[0-9]+)/$', views.VideoDetail.as_view()),

    ##url(r'^videos/(?P<pk>[0-9]+)$', video_detail, name='video_detail'),

    #url(r'^impressions/$',views.impression_list),
    #url(r'^impressions/$',views.ImpressionList.as_view()),

    url(r'^impressions$', impression_list, name='impression_list'),

    #url(r'^impression/(?P<pk>[0-9]+)/$',views.impression_detail),
    #url(r'^impression/(?P<pk>[0-9]+)/$',views.ImpressionDetail.as_view()),

    url(r'^impression/(?P<pk>[0-9]+)$', impression_detail, name='impression_detail'),


]

from .api import  RegistrationAPI, LoginAPI, UserAPI
from rest_framework.authtoken import views
urlpatterns += [
    url(r'^api-token-auth/', views.obtain_auth_token),
    path('rest-auth/', include('rest_auth.urls')),
    url(r'^api/auth/register/$', RegistrationAPI.as_view()), ##doesnt save the Token to the db
    url(r'^api/auth/login/$', LoginAPI.as_view()),
    url(r'^api/auth/user/$', UserAPI.as_view()), ##this one doesnt seem to work in Postman
    url(r'^api/auth/', include('knox.urls')),
    url(r'^api/', include(router.urls)),

]

# urlpatterns = format_suffix_patterns(urlpatterns) not needed when router is used
