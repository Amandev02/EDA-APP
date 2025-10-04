# dashboard/management/commands/import_csv.py
import pandas as pd
from django.core.management.base import BaseCommand
from dashboard.models import Record
from django.db import transaction
from datetime import datetime

class Command(BaseCommand):
    help = "Import Technical Evaluation.csv into Record model"

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str, default='Technical Evaluation.csv')

    def handle(self, *args, **options):
        path = options['path']
        df = pd.read_csv(path)

        objs = []
        for _, row in df.iterrows():
            # Safely parse date if provided
            date_val = None
            if 'date' in row and pd.notna(row['date']):
                try:
                    date_val = pd.to_datetime(row['date']).date()
                except Exception:
                    date_val = None

            # Convert numeric fields safely
            def to_float(x):
                try:
                    return float(x)
                except:
                    return None

            r = Record(
                market = row.get('Market'),
                channel = row.get('Channel'),
                region = row.get('Region'),
                category = row.get('Category'),
                subcategory = row.get('SubCategory'),
                brand = row.get('Brand'),
                variant = row.get('Variant'),
                pack_type = row.get('PackType'),
                ppg = row.get('PPG'),
                pack_size = row.get('PackSize'),
                year = int(row['Year']) if 'Year' in row and pd.notna(row['Year']) else None,
                month = int(row['Month']) if 'Month' in row and pd.notna(row['Month']) else None,
                week = row.get('Week'),
                date = date_val,
                sales_value = to_float(row.get('SalesValue')),
                volume = to_float(row.get('Volume')),
                volume_units = row.get('VolumeUnits'),
            )
            objs.append(r)

        with transaction.atomic():
            Record.objects.all().delete()  # optional: clear existing rows
            Record.objects.bulk_create(objs, batch_size=1000)

        self.stdout.write(self.style.SUCCESS(f"Imported {len(objs)} rows from {path}"))
