from django.contrib import admin

from eav.forms import BaseDynamicEntityForm
from eav.admin import BaseEntityAdmin

from experiments.models import Experiment


class ExperimentAdminForm(BaseDynamicEntityForm):
    model = Experiment


class ExperimentAdmin(BaseEntityAdmin):
    form = ExperimentAdminForm


admin.site.register(Experiment, ExperimentAdmin)


from django.contrib.flatpages.admin import FlatpageForm, FlatPageAdmin
from django.contrib.flatpages.models import FlatPage
## OOPS this is a custom widget that works for initializing
## tinymce instances on stacked and tabular inlines
## for flatpages, just use the tinymce packaged one.
#from content.widgets import TinyMCE 
from tinymce.widgets import TinyMCE


class PageForm(FlatpageForm):

    class Meta:
        model = FlatPage
        fields = "__all__"
        widgets = {
            'content' : TinyMCE(attrs={'cols': 100, 'rows': 15}),
        }


class PageAdmin(FlatPageAdmin):
    
    """
    Page Admin
    """
    form = PageForm


admin.site.unregister(FlatPage)
admin.site.register(FlatPage, PageAdmin)
