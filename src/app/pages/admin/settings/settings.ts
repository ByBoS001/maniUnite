import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
type Tab =
  | 'general'
  | 'plataforma'
  | 'seguridad'
  | 'notificaciones'
  | 'avanzado';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
})
export class Settings {
  tab: Tab = 'general';

  setTab(t: Tab) {
    this.tab = t;
  }

  // Datos demo para inputs/switches
  general = {
    nombre: 'Bingos Solidarios',
    descripcion: 'Plataforma de bingos benéficos online',
    email: 'contacto@bingossolidarios.com',
    telefono: '+54 11 1234–5678',
    zonaHoraria: '',
    idioma: '',
    moneda: '',
    fecha: '',
  };

  plataforma = {
    maxParticipantes: 500,
    minParaIniciar: 10,
    precioBase: 50,
    comision: 10,
    inicioAuto: false,
    calidad: '',
    maxEspectadores: 1000,
    delay: 5,
    moderacionAuto: true,
    grabaciones: false,
  };

  seguridad = {
    sesionMin: 60,
    intentosLogin: 5,
    dosFactores: true,
    passwordStrict: true,
    ipWhitelist: '192.168.1.1, 10.0.0.1',
    retentionDias: 365,
    encryptDb: true,
    backupFreq: '',
    auditLogs: true,
    gdpr: true,
  };

  notifs = {
    emailUser: true,
    smsUser: false,
    pushUser: true,
    promoFreq: '',
    alertasSistema: true,
    reportesIngresos: true,
    alertasActividad: false,
    alertasSeguridad: true,
    adminEmail: 'admin@bingossolidarios.com',
  };

  avanzado = {
    apiLimit: 1000,
    cacheSeg: 300,
    debug: false,
    analytics: true,
    cdn: true,
    gateway: '',
    emailSrv: '',
    smsProv: '',
    storageSrv: '',
    version: 'v2.1.4',
    uptime: '99.9%',
    storageUse: '15 GB',
  };
}
