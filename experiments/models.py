from __future__ import unicode_literals

from django.db import models


PARAMETER_TYPES = (
    ('INT', 'Integer'),
    ('STR', 'String'),
    ('ARR', 'Array')
)


class Parameter(models.Model):
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    parameter_type = models.CharField(max_length=3,
                                      choices=PARAMETER_TYPES)

    def __unicode__(self):
        return self.name


class Experiment(models.Model):
    name = models.CharField(max_length=255)
    questions = models.ManyToManyField('jspsych.JSPsychPlugin')
    parameters = models.ManyToManyField('experiments.Parameter')

    def __unicode__(self):
        return self.name

# italics_probability = 1. / 25
# missing_to_stop = 8
# timing_default = 1500
# timing_attention = 3000
# prime_duration = 150
# target_duration = 3000
# cross_duration = 500
# blank_duration = 50
