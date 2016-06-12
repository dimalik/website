from django.views.generic import TemplateView
from publications.models import Publication
from publications.utils import populate


class Home(TemplateView):

    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Home, self).get_context_data(*args, **kwargs)
        years = []
        publications = Publication.objects.select_related()
        publications = publications.filter(external=False)
        publications = publications.order_by('-year', '-month', '-id')

        for publication in publications:
            if publication.type.hidden:
                continue
            if not years or (years[-1][0] != publication.year):
                years.append((publication.year, []))
            years[-1][1].append(publication)

        populate(publications)
        context['years'] = years
        return context
