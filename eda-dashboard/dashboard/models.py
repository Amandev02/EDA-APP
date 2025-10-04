from django.db import models

class Record(models.Model):
    market = models.CharField(max_length=100, blank=True, null=True)
    channel = models.CharField(max_length=100, blank=True, null=True)
    region = models.CharField(max_length=100, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    subcategory = models.CharField(max_length=100, blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    variant = models.CharField(max_length=200, blank=True, null=True)
    pack_type = models.CharField(max_length=100, blank=True, null=True)
    ppg = models.CharField(max_length=100, blank=True, null=True)
    pack_size = models.CharField(max_length=100, blank=True, null=True)

    year = models.IntegerField(blank=True, null=True)
    month = models.IntegerField(blank=True, null=True)
    week = models.CharField(max_length=50, blank=True, null=True)
    date = models.DateField(blank=True, null=True)

    sales_value = models.FloatField(blank=True, null=True)
    volume = models.FloatField(blank=True, null=True)
    volume_units = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['year']),
            models.Index(fields=['brand']),
            models.Index(fields=['pack_type']),
        ]

    def __str__(self):
        return f"{self.brand} {self.year}-{self.month} {self.pack_type}"
