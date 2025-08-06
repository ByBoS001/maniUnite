import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card';

@Component({
  selector: 'app-donaciones',
  imports: [CommonModule, TestimonialCard],
  templateUrl: './donaciones.html',
  styleUrl: './donaciones.scss',
})
export class Donaciones {
  tipo = signal<'dinero' | 'premios'>('dinero');

  setTipo(valor: 'dinero' | 'premios') {
    this.tipo.set(valor);
  }

  currentSlide = 0;

  testimonios = [
    {
      quote:
        'En un año hemos logrado equipar completamente el centro médico comunitario. ¡Gracias a todos!',
      author: 'Centro de Salud Esperanza',
      role: 'Beneficiario',
      impact: '500 familias atendidas',
      image: 'https://source.unsplash.com/200x200/?doctor,woman',
      color: 'bg-teal-500',
    },
    {
      quote:
        'Doné mi servicio de fotografía y ver las sonrisas de los ganadores no tiene precio.',
      author: 'Ana Rodríguez',
      role: 'Donante de Premio',
      impact: 'Sesión fotográfica profesional',
      image: 'https://source.unsplash.com/200x200/?photographer,woman',
      color: 'bg-yellow-500',
    },
    {
      quote:
        'Donar a través de los bingos me permite ayudar mientras me divierto. Es increíble ver el impacto real.',
      author: 'María González',
      role: 'Donante Regular',
      impact: '$450 donados este año',
      image: 'https://source.unsplash.com/200x200/?business,woman',
      color: 'bg-indigo-500',
    },
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonios.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.testimonios.length) %
      this.testimonios.length;
  }
}
