from django.conf.urls import url

from experiments.views import ContextualLearningExperiment

urlpatterns = [
    url(r'^contextual_learning/$', ContextualLearningExperiment.as_view(),
        name='hometest'),
]
