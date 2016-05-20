import random
import json

from django.views.generic import TemplateView
from django.http import HttpResponse
from experiment_code.contextual_learning.community import CommunityNetwork


def getStimuli():
    with open('experiments/experiment_code/contextual_learning/words.txt') as fin:
        words = fin.read().strip().split()
    random.shuffle(words)
    cn = CommunityNetwork(3, 4)
    stream = cn.generateStreams(800, type_='hamiltonian')
    words = words[:len(set(stream))]
    stream, mappings = cn.wordReplacer(stream, words)
    return [stream.split(), mappings]


class MainExperiment(TemplateView):

    template_name = 'experiments/contextual_learning.html'

    def get_context_data(self, *args, **kwargs):
        context = super(MainExperiment, self).get_context_data(*args, **kwargs)
        context['words'] = json.dumps(getStimuli())
        return context


def get_data(request):
    if request.is_ajax():
        stimuli, mappings = getStimuli()
        return HttpResponse(
            json.dumps({
                'stimuli': stimuli,
                'mappings': mappings}),
            content_type='application/json')
