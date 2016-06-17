import random

from helper_views import ExperimentView
from experiment_code.contextual_learning import (CommunityNetwork,
                                                 StreamGenerator)


class ContextualLearningExperiment(ExperimentView):

    name = 'contextual_learning'

    def get_data(self):
        words = "moke thite jiv pif dex wug feeb bim lup zabe vap chuv".split()
        random.shuffle(words)
        cn = CommunityNetwork(3, 4)
        sg = StreamGenerator(cn.transition_matrix)
        stream = sg.generateStreams(800,
                                    walk_type='hamiltonian',
                                    stream_type='neighbourhood',
                                    nb_size=800)
        words = words[:len(set(stream))]
        stream, mappings = sg.wordReplacer(stream, words)
        return stream
