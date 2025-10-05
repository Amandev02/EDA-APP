"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from dashboard import views  

urlpatterns = [
    path('admin/', admin.site.urls),
     path('api/volume-by-year/', views.volume_by_year),
    path('api/sales-by-year/', views.sales_by_year),
    path('api/monthly-trend/', views.monthly_trend),
    path('api/market-share/', views.market_share_by_brand),
    path('api/filter-options/', views.filter_options),
    path('api/brand-trend/', views.brand_trend, name='brand-trend'),
    path('api/yoy-growth/', views.yoy_growth, name='yoy-growth'),

]
