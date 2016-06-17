from django.contrib import admin
from django.contrib.flatpages.admin import FlatpageForm, FlatPageAdmin
from django.contrib.flatpages.models import FlatPage

from tinymce.widgets import TinyMCE

from experiments.models import Experiment, Parameter


class PageForm(FlatpageForm):

    class Meta:
        model = FlatPage
        fields = "__all__"
        widgets = {
            'content': TinyMCE(attrs={'cols': 100, 'rows': 15}),
        }


class PageAdmin(FlatPageAdmin):
    form = PageForm


admin.site.register(Experiment)
admin.site.register(Parameter)
admin.site.unregister(FlatPage)
admin.site.register(FlatPage, PageAdmin)
