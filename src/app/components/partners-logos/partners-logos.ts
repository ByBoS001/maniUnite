import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Partner {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-partners-logos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners-logos.html',
  styleUrl: './partners-logos.scss',
})
export class PartnersLogos {
  partners: Partner[] = [
    { name: 'Banco de Alimentos', logo: '/assets/image/banco de alimentos.webp' },
    { name: 'Cruz Roja', logo: '/assets/image/cruz roja.webp' },
    { name: 'Fundación Educación', logo: '/assets/image/fundacion educacion.webp' },
    { name: 'Hogar de Niños', logo: '/assets/image/hogar.webp' },
    { name: 'Médicos Sin Fronteras', logo: '/assets/image/medicos.webp' },
    { name: 'UNICEF', logo: '/assets/image/unicef.webp' },
  ];
}
