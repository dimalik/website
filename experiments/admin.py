from django.contrib import admin

from eav.forms import BaseDynamicEntityForm
from eav.admin import BaseEntityAdmin

from experiments.models import Experiment


class ExperimentAdminForm(BaseDynamicEntityForm):
    model = Experiment


class ExperimentAdmin(BaseEntityAdmin):
    form = ExperimentAdminForm


admin.site.register(Experiment, ExperimentAdmin)
