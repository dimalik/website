from __future__ import unicode_literals

import json

from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.urlresolvers import reverse

from tinymce.models import HTMLField


class JSPsychPlugin(models.Model):

    name = models.CharField(max_length=255)
    timing_post_trial = models.IntegerField(default=1000, null=True,
                                            blank=True)
    on_finish = models.CharField(
        max_length=255,
        help_text="This should be the name of a function defined \
for the html.",
        blank=True,
        null=True)
    data = models.TextField(blank=True, null=True)
    display_element = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        abstract = True

    def __unicode__(self):
        return self.name

    def to_json(self):
        d = {x: getattr(self, x)
             for x in self._meta.get_all_field_names()
             if getattr(self, x) and x != 'id'}
        d['type'] = self.type
        return json.dumps(d)


class JSPsychText(JSPsychPlugin):

    text = HTMLField()
    cont_key = ArrayField(models.CharField(max_length=5), blank=True)

    @property
    def type(self):
        return 'text'


class JSPsychSingleStim(JSPsychPlugin):

    stimulus = HTMLField()
    is_html = models.BooleanField(default=True)
    choices = ArrayField(models.CharField(max_length=5), blank=True)
    prompt = HTMLField(blank=True, null=True)
    timing_stim = models.IntegerField(default=-1, blank=True, null=True)
    timing_response = models.IntegerField(default=-1, blank=True, null=True)
    response_ends_trial = models.BooleanField(default=True)

    @property
    def type(self):
        return 'single-stim'


class JSPsychHTML(JSPsychPlugin):

    url = models.CharField(max_length=255)
    cont_key = models.IntegerField(null=True, blank=True)
    cont_btn = models.CharField(max_length=255, null=True, blank=True)
    check_fn = models.CharField(max_length=255, null=True, blank=True)
    force_refresh = models.BooleanField(default=False)

    @property
    def type(self):
        return 'html'

    def save(self, *args, **kwargs):
        self.url = reverse('get_form', kwargs={'form_name': self.url})
        super(JSPsychHTML, self).save(*args, **kwargs)
