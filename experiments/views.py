import random
import json

from django.views.generic import TemplateView
from django.http import HttpResponse
from experiment_code.contextual_learning import (CommunityNetwork,
                                                 StreamGenerator)
from jspsych.models import JSPsychText, JSPsychSingleStim, JSPsychHTML


def getStimuli(k, l, n):
    with open('experiments/experiment_code/contextual_learning/words.txt') as fin:
        words = fin.read().strip().split()
    random.shuffle(words)
    cn = CommunityNetwork(k, l)
    sg = StreamGenerator(cn.transition_matrix)
    stream = sg.generateStreams(n,
                                walk_type='hamiltonian',
                                stream_type='neighbourhood',
                                nb_size=n)
    words = words[:len(set(stream))]
    stream, mappings = sg.wordReplacer(stream, words)
    return [stream.split(), mappings]


class MainExperiment(TemplateView):

    template_name = 'experiments/contextual_learning.html'

    def get_context_data(self, *args, **kwargs):
        context = super(MainExperiment, self).get_context_data(*args, **kwargs)
        context['consent1'] = JSPsychText.objects.get(pk=1)
        context['instructions'] = JSPsychText.objects.get(pk=2)
        context['cross'] = JSPsychSingleStim.objects.get(name='cross')
        context['new_task'] = JSPsychSingleStim.objects.get(name='new_task')
        context['concentration_warning'] = JSPsychSingleStim.objects.get(
            name='concentration_warning')
        # context['words'] = json.dumps(getStimuli())
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
                stimuli, mappings = getStimuli(3, 4, 140)
                return response_dict(200, 'success',
                                     stimuli=stimuli,
                                     mappings=mappings)
            elif task == 'task3':
                stimuli, mappings = getStimuli(3, 4, 800)
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
    if request.is_ajax():
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


def save_data(request):
    import ipdb; ipdb.set_trace()
    return HttpResponse(json.dumps({}), content_type='application/json')


class GetForm(TemplateView):

    def get_template_names(self):
        form = self.kwargs['form_name']
        if not form:
            raise IOError('Form file could not be found')
        return 'forms/{}.html'.format(form)


def get_questions(request):
    if request.is_ajax():
        response = {}
        text = request.GET.getlist('text[]', '')
        single_stim = request.GET.getlist('single-stim[]', '')
        html = request.GET.getlist('html[]', '')
        if text:
            for question in text:
                response[question] = JSPsychText.objects.get(
                    name=question).to_json()
        if single_stim:
            for question in single_stim:
                response[question] = JSPsychSingleStim.objects.get(
                    name=question).to_json()
        if html:
            for question in html:
                response[question] = JSPsychHTML.objects.get(
                    name=question).to_json()

        return response_dict(200, 'Success', **response)
