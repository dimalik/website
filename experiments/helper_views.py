import cPickle as pkl
import json

from django.http import HttpResponse
from django.views.generic import TemplateView

from experiments.models import Experiment


def save_data(request):
    if request.POST:
        experiment = request.POST.get('table', '')
        data = request.POST.get('json', '')
        opt_data = request.POST.get('opt_data', '')
        with open('/home/da352/data', 'wb') as fout:
            pkl.dump([experiment, data, opt_data], fout, -1)
    return HttpResponse(json.dumps({'code': 200, 'message': 'success'}),
                        content_type='application/json')


class GetForm(TemplateView):
    def get_template_names(self):
        form = self.kwargs['form_name']
        if not form:
            raise IOError('Form file could not be found')
        return 'forms/{}.html'.format(form)


class ExperimentView(TemplateView):

    @staticmethod
    def parse_params(parameters):
        ans = {}
        for param in parameters:
            if param.parameter_type == 'INT':
                ans[param.name] = int(param.value)
            elif param.parameter_type == 'ARR':
                ans[param.name] = json.loads(
                    '[' + param.value.replace("'", '"') + ']')
            elif param.parameter_type == 'FLO':
                ans[param.name] = float(param.value)
            else:
                ans[param.name] = param.value
        return ans

    @staticmethod
    def parse_questions(questions):
        return {q.name: q.to_json() for q in questions}

    def get_context_data(self, *args, **kwargs):
        context = super(ExperimentView, self).get_context_data(*args, **kwargs)

        experiment = Experiment.objects.get(name=self.name)
        context['parameters'] = json.dumps(self.parse_params(
            experiment.parameters.all()))
        context['questions'] = json.dumps(self.parse_questions(
            experiment.questions.all()))
        context['data'] = json.dumps(self._get_data())
        return context

    def get_template_names(self):
        return 'experiments/{}.html'.format(self.name)

    def _get_data(self):
        data = self.get_data()
        return data

    def get_data(self):
        raise NotImplementedError
