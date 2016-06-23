import itertools
import random

from helper_views import ExperimentView
from experiment_code.contextual_learning import (CommunityNetwork,
                                                 StreamGenerator)
from experiment_code.online_experiment import (McRaeModel,
                                               McRaeSimilarityMinimizer,
                                               StreamExperiment)


class ContextualLearningExperiment(ExperimentView):

    name = 'contextual_learning'

    def get_data(self):
        # training sequence
        cn = CommunityNetwork(3, 4)
        sg = StreamGenerator(cn.transition_matrix)
        stream = sg.generateStreams(800,
                                    walk_type='hamiltonian',
                                    stream_type='neighbourhood',
                                    nb_size=4)

        prime_targets = [(p, t,) for
                         p, t in itertools.combinations(3 * 4, 2)]

        mcm = McRaeModel('mcrae_norms.tsv')
        mcsm = McRaeSimilarityMinimizer(mcm, mcm.keys())
        mcsm.word_similarity_minimiser(iterations=2000, nwords=12, patience=10)
        words = mcsm.best

        nonwords = []

        random.shuffle(words)
        prime_targets += [('READY', nonword) for nonword in nonwords]
        random.shuffle(prime_targets)
        se = StreamExperiment(stream, words)
        timeline = se.fixSequence()
        timeline += se.fixPriming(prime_targets, )
        return timeline


# READY -> nonword
# READY -> unrelated word
# same neighbourhood words
# different neighbourhood words
