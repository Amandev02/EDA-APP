from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from .models import Record


def build_filters(request):
    f = {}
    for field in ['brand', 'pack_type', 'ppg', 'channel', 'year']:
        val = request.GET.get(field)
        if val:
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
    qs = (
        Record.objects.filter(**f)
        .values('year')
        .annotate(total_volume=Sum('volume'))
        .order_by('year')
    )
    return Response(list(qs))


@api_view(['GET'])
def sales_by_year(request):
    f = build_filters(request)
    qs = (
        Record.objects.filter(**f)
        .values('year')
        .annotate(total_sales=Sum('sales_value'))
        .order_by('year')
    )
    return Response(list(qs))


@api_view(['GET'])
def monthly_trend(request):
    f = build_filters(request)
    qs = (
        Record.objects.filter(**f)
        .values('year', 'month')
        .annotate(total_sales=Sum('sales_value'))
        .order_by('year', 'month')
    )
    return Response(list(qs))



@api_view(['GET'])
def brand_trend(request):
    f = build_filters(request)
    qs = (
        Record.objects.filter(**f)
        .values('year', 'month', 'brand')
        .annotate(total_sales=Sum('sales_value'))
        .order_by('year', 'month', 'brand')
    )

    # Transform into frontend-friendly format
    # { "2023-01": {"BrandA": 2000, "BrandB": 1500}, ... }
    data = {}
    for row in qs:
        label = f"{row['year']}-{str(row['month']).zfill(2)}"
        if label not in data:
            data[label] = {"month": label}
        data[label][row['brand']] = row['total_sales']

    return Response(list(data.values()))


@api_view(['GET'])
def market_share_by_brand(request):
    f = build_filters(request)
    measure = request.GET.get('measure', 'sales')  # 'sales' or 'volume'
    if measure == 'volume':
        qs = (
            Record.objects.filter(**f)
            .values('brand')
            .annotate(value=Sum('volume'))
            .order_by('-value')[:50]
        )
    else:
        qs = (
            Record.objects.filter(**f)
            .values('brand')
            .annotate(value=Sum('sales_value'))
            .order_by('-value')[:50]
        )
    return Response(list(qs))


@api_view(['GET'])
def yoy_growth(request):
    """Year-over-Year sales growth %."""
    f = build_filters(request)
    qs = (
        Record.objects.filter(**f)
        .values('year')
        .annotate(total_sales=Sum('sales_value'))
        .order_by('year')
    )

    data = list(qs)
    results = []
    for i in range(1, len(data)):
        prev = data[i - 1]['total_sales'] or 0
        curr = data[i]['total_sales'] or 0
        growth = ((curr - prev) / prev * 100) if prev else 0
        results.append({
            "year": data[i]['year'],
            "growth": round(growth, 2),
        })
    return Response(results)


@api_view(['GET'])
def filter_options(request):
    """Returns distinct values for dropdown filters, without blanks."""
    def clean(values):
        return [v for v in values if v and str(v).strip()]

    data = {
        "brands": clean(
            Record.objects.order_by('brand')
            .values_list('brand', flat=True).distinct()
        ),
        "pack_types": clean(
            Record.objects.order_by('pack_type')
            .values_list('pack_type', flat=True).distinct()
        ),
        "ppgs": clean(
            Record.objects.order_by('ppg')
            .values_list('ppg', flat=True).distinct()
        ),
        "channels": clean(
            Record.objects.order_by('channel')
            .values_list('channel', flat=True).distinct()
        ),
        "years": clean(
            Record.objects.order_by('year')
            .values_list('year', flat=True).distinct()
        ),
    }
    return Response(data)
