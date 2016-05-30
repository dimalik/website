from __future__ import unicode_literals

from django.db import models


class Experiment(models.Model):
    name = models.CharField(max_length=255)


class ContextualLearning(models.Model):
    subject = models.CharField(max_length=255)
    trial_id = models.IntegerField()
    rt = models.IntegerField()
    word = models.CharField(max_length=255)
    graph_id = models.IntegerField()
    btn_presed = models.CharField(max_length=255)

    def __unicode__(self):
        return "Contextual Learning trial [subj_id: {} | trial_id: {}]".format(
            self.subject, self.trial_id)
