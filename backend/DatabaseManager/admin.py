from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = (
        "id_usuario",
        "nombre_usuario",
        "apellido_usuario",
        "edad",
        "sexo",
        "email",
        "password",
        "telefono",
        "descripcion_usuario",
        "imagen_perfil",
        "tiempo_registro",
    )
    search_fields = (
        "id_usuario",
        "nombre_usuario",
        "apellido_usuario",
        "edad",
        "sexo",
        "email",
        "password",
        "telefono",
        "descripcion_usuario",
        "imagen_perfil",
        "tiempo_registro",
    )
    list_filter = (
        "id_usuario",
        "nombre_usuario",
        "apellido_usuario",
        "edad",
        "sexo",
        "email",
        "password",
        "telefono",
        "descripcion_usuario",
        "imagen_perfil",
        "tiempo_registro",
    )
    ordering = (
        "id_usuario",
        "nombre_usuario",
        "apellido_usuario",
        "edad",
        "sexo",
        "email",
        "password",
        "telefono",
        "descripcion_usuario",
        "imagen_perfil",
        "tiempo_registro",
    )


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ("id_region", "nombre_region")
    search_fields = ("id_region", "nombre_region")
    list_filter = ("id_region", "nombre_region")
    ordering = ("id_region", "nombre_region")


@admin.register(Comuna)
class ComunaAdmin(admin.ModelAdmin):
    list_display = ("id_comuna", "nombre_comuna")
    search_fields = ("id_comuna", "nombre_comuna")
    list_filter = ("id_comuna", "nombre_comuna")
    ordering = ("id_comuna", "nombre_comuna")


@admin.register(Comunidades)
class ComunidadesAdmin(admin.ModelAdmin):
    list_display = (
        "id_comunidad",
        "nombre_comunidad",
        "latitud",
        "longitud",
        "tiempo_registro",
    )
    search_fields = (
        "id_comunidad",
        "nombre_comunidad",
        "latitud",
        "longitud",
        "tiempo_registro",
    )
    list_filter = (
        "id_comunidad",
        "nombre_comunidad",
        "latitud",
        "longitud",
        "tiempo_registro",
    )
    ordering = (
        "id_comunidad",
        "nombre_comunidad",
        "latitud",
        "longitud",
        "tiempo_registro",
    )


@admin.register(ComunaUsuario)
class ComunaUsuarioAdmin(admin.ModelAdmin):
    list_display = ("id_usuario", "id_comuna")
    search_fields = ("id_usuario", "id_comuna")
    list_filter = ("id_usuario", "id_comuna")
    ordering = ("id_usuario", "id_comuna")


@admin.register(ComunidadesUsuario)
class ComunidadesUsuarioAdmin(admin.ModelAdmin):
    list_display = ("id_usuario", "id_comunidad")
    search_fields = ("id_usuario", "id_comunidad")
    list_filter = ("id_usuario", "id_comunidad")
    ordering = ("id_usuario", "id_comunidad")


@admin.register(ComunaComunidad)
class ComunaComunidadAdmin(admin.ModelAdmin):
    list_display = ("id_comuna", "id_comunidad")
    search_fields = ("id_comuna", "id_comunidad")
    list_filter = ("id_comuna", "id_comunidad")
    ordering = ("id_comuna", "id_comunidad")


@admin.register(ComunaRegion)
class ComunaRegionAdmin(admin.ModelAdmin):
    list_display = ("id_region", "id_comuna")
    search_fields = ("id_region", "id_comuna")
    list_filter = ("id_region", "id_comuna")
    ordering = ("id_region", "id_comuna")


@admin.register(Roles)
class RolesAdmin(admin.ModelAdmin):
    list_display = ("id_rol", "nombre_rol")
    search_fields = ("id_rol", "nombre_rol")
    list_filter = ("id_rol", "nombre_rol")
    ordering = ("id_rol", "nombre_rol")


@admin.register(RolUsuario)
class RolUsuarioAdmin(admin.ModelAdmin):
    list_display = ("id_usuario", "id_rol")
    search_fields = ("id_usuario", "id_rol")
    list_filter = ("id_usuario", "id_rol")
    ordering = ("id_usuario", "id_rol")


@admin.register(Vehiculos)
class VehiculoAdmin(admin.ModelAdmin):
    list_display = (
        "id_vehiculo",
        "marca_vehiculo",
        "modelo_vehiculo",
        "tipo_de_vehiculo",
        "nro_asientos_disp",
        "color_vehiculo",
        "patente",
        "ano_vehiculo",
        "imagen_perfil",
        "tiempo_registro",
    )
    search_fields = (
        "id_vehiculo",
        "marca_vehiculo",
        "modelo_vehiculo",
        "tipo_de_vehiculo",
        "nro_asientos_disp",
        "color_vehiculo",
        "patente",
        "ano_vehiculo",
        "imagen_perfil",
        "tiempo_registro",
    )
    list_filter = (
        "id_vehiculo",
        "marca_vehiculo",
        "modelo_vehiculo",
        "tipo_de_vehiculo",
        "nro_asientos_disp",
        "color_vehiculo",
        "patente",
        "ano_vehiculo",
        "imagen_perfil",
        "tiempo_registro",
    )
    ordering = (
        "id_vehiculo",
        "marca_vehiculo",
        "modelo_vehiculo",
        "tipo_de_vehiculo",
        "nro_asientos_disp",
        "color_vehiculo",
        "patente",
        "ano_vehiculo",
        "imagen_perfil",
        "tiempo_registro",
    )


@admin.register(VehiculoUsuario)
class VehiculoUsuarioAdmin(admin.ModelAdmin):
    list_display = ("id_usuario", "id_vehiculo")
    search_fields = ("id_usuario", "id_vehiculo")
    list_filter = ("id_usuario", "id_vehiculo")
    ordering = ("id_usuario", "id_vehiculo")


@admin.register(Calificaciones)
class CalificacionesAdmin(admin.ModelAdmin):
    list_display = (
        "id_calificacion",
        "id_calificador",
        "id_calificado",
        "comentario",
        "fecha_calificacion",
    )
    search_fields = (
        "id_calificacion",
        "id_calificador",
        "id_calificado",
        "comentario",
        "fecha_calificacion",
    )
    list_filter = (
        "id_calificacion",
        "id_calificador",
        "id_calificado",
        "comentario",
        "fecha_calificacion",
    )
    ordering = (
        "id_calificacion",
        "id_calificador",
        "id_calificado",
        "comentario",
        "fecha_calificacion",
    )


@admin.register(CategoriasCalificacion)
class CategoriasCalificacionAdmin(admin.ModelAdmin):
    list_display = (
        "id_calificacion",
        "seguridad",
        "limpieza",
        "comodidad",
        "puntualidad",
    )
    search_fields = (
        "id_calificacion",
        "seguridad",
        "limpieza",
        "comodidad",
        "puntualidad",
    )
    list_filter = (
        "id_calificacion",
        "seguridad",
        "limpieza",
        "comodidad",
        "puntualidad",
    )
    ordering = ("id_calificacion", "seguridad", "limpieza", "comodidad", "puntualidad")


@admin.register(Rutas)
class RutasAdmin(admin.ModelAdmin):
    list_display = (
        "id_ruta",
        "id_vehiculo",
        "id_conductor",
        "nombre_ruta",
        "origen",
        "destino",
        "hora_salida",
        "cupos",
        "tiempo_registro",
    )
    search_fields = (
        "id_ruta",
        "id_vehiculo",
        "id_conductor",
        "nombre_ruta",
        "origen",
        "destino",
        "hora_salida",
        "cupos",
        "tiempo_registro",
    )
    list_filter = (
        "id_ruta",
        "id_vehiculo",
        "id_conductor",
        "nombre_ruta",
        "origen",
        "destino",
        "hora_salida",
        "cupos",
        "tiempo_registro",
    )
    ordering = (
        "id_ruta",
        "id_vehiculo",
        "id_conductor",
        "nombre_ruta",
        "origen",
        "destino",
        "hora_salida",
        "cupos",
        "tiempo_registro",
    )


@admin.register(Dias)
class DiasAdmin(admin.ModelAdmin):
    list_display = ("id_dia", "nombre_dia")
    search_fields = ("id_dia", "nombre_dia")
    list_filter = ("id_dia", "nombre_dia")
    ordering = ("id_dia", "nombre_dia")


@admin.register(DiasRutas)
class DiasRutasAdmin(admin.ModelAdmin):
    list_display = ("id_dia", "id_ruta")
    search_fields = ("id_dia", "id_ruta")
    list_filter = ("id_dia", "id_ruta")
    ordering = ("id_dia", "id_ruta")


@admin.register(Trayectoria)
class TrayectoriaAdmin(admin.ModelAdmin):
    list_display = ("id_trayectoria", "id_ruta", "tiempo_registro")
    search_fields = ("id_trayectoria", "id_ruta", "tiempo_registro")
    list_filter = ("id_trayectoria", "id_ruta", "tiempo_registro")
    ordering = ("id_trayectoria", "id_ruta", "tiempo_registro")


@admin.register(OrdenTrayectoria)
class OrdenTrayectoriaAdmin(admin.ModelAdmin):
    list_display = ("id_trayectoria", "orden", "latitud", "longitud")
    search_fields = ("id_trayectoria", "orden", "latitud", "longitud")
    list_filter = ("id_trayectoria", "orden", "latitud", "longitud")
    ordering = ("id_trayectoria", "orden", "latitud", "longitud")


@admin.register(ContactosEmergencia)
class ContactosEmergenciaAdmin(admin.ModelAdmin):
    list_display = ("id_usuario", "correo_emergencia")
    search_fields = ("id_usuario", "correo_emergencia")
    list_filter = ("id_usuario", "correo_emergencia")
    ordering = ("id_usuario", "correo_emergencia")


@admin.register(Notificaciones)
class NotificacionesAdmin(admin.ModelAdmin):
    list_display = (
        "id_notificacion",
        "id_propietario",
        "id_solicitante",
        "id_comunidad",
        "id_ruta",
        "aceptada",
        "es_ruta",
        "es_comunidad",
        "tiempo_registro",
    )
    search_fields = (
        "id_notificacion",
        "id_propietario",
        "id_solicitante",
        "id_comunidad",
        "id_ruta",
        "aceptada",
        "es_ruta",
        "es_comunidad",
        "tiempo_registro",
    )
    list_filter = (
        "id_notificacion",
        "id_propietario",
        "id_solicitante",
        "id_comunidad",
        "id_ruta",
        "aceptada",
        "es_ruta",
        "es_comunidad",
        "tiempo_registro",
    )
    ordering = (
        "id_notificacion",
        "id_propietario",
        "id_solicitante",
        "id_comunidad",
        "id_ruta",
        "aceptada",
        "es_ruta",
        "es_comunidad",
        "tiempo_registro",
    )


@admin.register(MiembrosComunidad)
class MiembrosComunidadAdmin(admin.ModelAdmin):
    list_display = (
        "id_comunidad",
        "id_miembro",
        "tiempo_registro",
    )
    search_fields = (
        "id_comunidad",
        "id_miembro",
        "tiempo_registro",
    )
    list_filter = (
        "id_comunidad",
        "id_miembro",
        "tiempo_registro",
    )
    ordering = (
        "id_comunidad",
        "id_miembro",
        "tiempo_registro",
    )


@admin.register(MiembrosRuta)
class MiembrosRutaAdmin(admin.ModelAdmin):
    list_display = (
        "id_ruta",
        "id_miembro",
        "tiempo_registro",
    )
    search_fields = (
        "id_ruta",
        "id_miembro",
        "tiempo_registro",
    )
    list_filter = (
        "id_ruta",
        "id_miembro",
        "tiempo_registro",
    )
    ordering = (
        "id_ruta",
        "id_miembro",
        "tiempo_registro",
    )


@admin.register(RutasEjecutadas)
class RutasEjecutadasAdmin(admin.ModelAdmin):
    list_display = (
        "id_ruta",
        "id_conductor",
        "inicio_real",
    )
    search_fields = (
        "id_ruta",
        "id_conductor",
        "inicio_real",
    )
    list_filter = (
        "id_ruta",
        "id_conductor",
        "inicio_real",
    )
    ordering = (
        "id_ruta",
        "id_conductor",
        "inicio_real",
    )

@admin.register(Ubicacion)
class UbicacionAdmin(admin.ModelAdmin):
    list_display = (
        "id_emisor",
        "id_receptor",
        "latitud",
        "longitud",
        "tiempo_registro",
    )
    search_fields = (
        "id_emisor",
        "id_receptor",
        "latitud",
        "longitud",
        "tiempo_registro",
    )
    list_filter = ("id_emisor", "id_receptor", "latitud", "longitud", "tiempo_registro")
    ordering = ("id_emisor", "id_receptor", "latitud", "longitud", "tiempo_registro")
