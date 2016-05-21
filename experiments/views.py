import random
import json

from django.views.generic import TemplateView
from django.http import HttpResponse
from experiment_code.contextual_learning.community import CommunityNetwork


def getStimuli(k, l, n):
    with open('experiments/experiment_code/contextual_learning/words.txt') as fin:
        words = fin.read().strip().split()
    random.shuffle(words)
    cn = CommunityNetwork(k, l)
    stream = cn.generateStreams(n, type_='hamiltonian')
    words = words[:len(set(stream))]
    stream, mappings = cn.wordReplacer(stream, words)
    return [stream.split(), mappings]


class MainExperiment(TemplateView):

    template_name = 'experiments/contextual_learning.html'

    def get_context_data(self, *args, **kwargs):
        context = super(MainExperiment, self).get_context_data(*args, **kwargs)
        context['words'] = json.dumps(getStimuli())
        return context


def response_dict(code, message, **kwargs):
    kwargs['message'] = message
    kwargs['code'] = code
    return HttpResponse(json.dumps(kwargs), content_type='application/json')


def get_data(request):
    if request.is_ajax():
        experiment = request.GET.get('experiment', '')
        if experiment == 'contextual_learning':
            task = request.GET.get('task', '')
            if task == 'task1':
                stimuli, mappings = getStimuli()
                return response_dict(200, 'success',
                                     stimuli=stimuli,
                                     mappings=mappings)
            elif task == 'task2':
                stimuli, mappings = getStimuli()
                return response_dict(200, 'success',
                                     stimuli=stimuli,
                                     mappings=mappings)
            elif task == 'task3':
                stimuli, mappings = getStimuli()
                return response_dict(200, 'success',
                                     stimuli=stimuli,
                                     mappings=mappings)
            else:
                return response_dict(404, 'Task not found.')
        else:
            return response_dict(404, 'Experiment not found.')
    else:
        return response_dict(405, 'Expecting ajax request.')


def get_parameters(request):
    if request.is_ajax:
        experiment = request.GET.get('experiment', '')
        if experiment == 'contextual_learning':
            # TODO: determine next parameters
            italics_probability = 1. / 25
            missing_to_stop = 8
            timing_default = 1500
            timing_attention = 3000
            prime_duration = 150
            target_duration = 3000
            cross_duration = 500
            blank_duration = 50
            return response_dict(
                200, 'Success',
                italics_probability=italics_probability,
                missing_to_stop=missing_to_stop,
                timing_default=timing_default,
                timing_attention=timing_attention,
                prime_duration=prime_duration,
                target_duration=target_duration,
                cross_duration=cross_duration,
                blank_duration=blank_duration)
        else:
            return response_dict(404, 'Experiment not found.')
    else:
        return response_dict(405, 'Expecting ajax request.')
