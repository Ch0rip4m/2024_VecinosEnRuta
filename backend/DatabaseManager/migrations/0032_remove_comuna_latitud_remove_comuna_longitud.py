# Generated by Django 5.0.4 on 2024-11-06 01:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('DatabaseManager', '0031_remove_recepcionpasajeros_id_pasajero_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comuna',
            name='latitud',
        ),
        migrations.RemoveField(
            model_name='comuna',
            name='longitud',
        ),
    ]
