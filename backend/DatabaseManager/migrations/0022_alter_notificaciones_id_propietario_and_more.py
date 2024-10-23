# Generated by Django 5.0.4 on 2024-10-23 14:18

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DatabaseManager', '0021_alter_notificaciones_id_propietario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notificaciones',
            name='id_propietario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='propietario_ruta', to=settings.AUTH_USER_MODEL, verbose_name='ID propietario ruta o comunidad'),
        ),
        migrations.AlterField(
            model_name='notificaciones',
            name='id_solicitante',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='propietario_solicitud', to=settings.AUTH_USER_MODEL, verbose_name='ID del solicitante'),
            preserve_default=False,
        ),
    ]
