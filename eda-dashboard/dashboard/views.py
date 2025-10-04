from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from .models import Record

def build_filters(request):
    f = {}
    for field in ['brand', 'pack_type', 'ppg', 'channel', 'year']:
        val = request.GET.get(field)
        if val:
            # allow case-insensitive filtering for strings
            if field == 'year':
                try:
                    f['year'] = int(val)
                except:
                    continue
            else:
                f[f"{field}__iexact"] = val
    return f

@api_view(['GET'])
def volume_by_year(request):
    f = build_filters(request)
    qs = Record.objects.filter(**f).values('year').annotate(total_volume=Sum('volume')).order_by('year')
    return Response(list(qs))

@api_view(['GET'])
def sales_by_year(request):
    f = build_filters(request)
    qs = Record.objects.filter(**f).values('year').annotate(total_sales=Sum('sales_value')).order_by('year')
    return Response(list(qs))

@api_view(['GET'])
def monthly_trend(request):
    # Aggregated by Year+Month for trend lines
    f = build_filters(request)
    qs = (Record.objects.filter(**f)
          .values('year', 'month')
          .annotate(total_sales=Sum('sales_value'))
          .order_by('year', 'month'))
    # convert to month label in frontend, or return year+month
    return Response(list(qs))

@api_view(['GET'])
def market_share_by_brand(request):
    f = build_filters(request)
    measure = request.GET.get('measure', 'sales')  # 'sales' or 'volume'
    if measure == 'volume':
        qs = Record.objects.filter(**f).values('brand').annotate(value=Sum('volume')).order_by('-value')[:50]
    else:
        qs = Record.objects.filter(**f).values('brand').annotate(value=Sum('sales_value')).order_by('-value')[:50]
    return Response(list(qs))

@api_view(['GET'])
def filter_options(request):
    # returns unique values for UI dropdowns
    data = {
        "brands": list(Record.objects.order_by('brand').values_list('brand', flat=True).distinct()),
        "pack_types": list(Record.objects.order_by('pack_type').values_list('pack_type', flat=True).distinct()),
        "ppgs": list(Record.objects.order_by('ppg').values_list('ppg', flat=True).distinct()),
        "channels": list(Record.objects.order_by('channel').values_list('channel', flat=True).distinct()),
        "years": list(Record.objects.order_by('year').values_list('year', flat=True).distinct()),
    }
    return Response(data)
