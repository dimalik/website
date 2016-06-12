from django.conf.urls import url
from website.views import Home

urlpatterns = [
    url(r'^skatoules/$', Home.as_view(), name='hometest'),
]
