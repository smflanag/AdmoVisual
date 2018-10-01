from django.conf.urls import url,include
from rest_framework.urlpatterns import format_suffix_patterns
from adplayer import views

urlpatterns = [
    url(r'^playlists/$', views.playlist_list),
    url(r'^playlist_for_player/(?P<pk>[0-9]+)/$',views.playlist_detail), ##
    url(r'^videos/$', views.videos_list),
    url(r'^videos/(?P<pk>[0-9]+)/$', views.video_detail), ##
    url(r'^impressions/$',views.impression_list),
    url(r'^impression/(?P<pk>[0-9]+)$',views.impression_detail), ##
]

urlpatterns = format_suffix_patterns(urlpatterns)
