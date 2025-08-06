import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Faq {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class FaqAccordion {
  faqs: Faq[] = [
    {
      question: '¿Cómo funciona la transparencia en los bingos?',
      answer:
        'Todos los bingos se transmiten en vivo y las tablas se asignan aleatoriamente.',
      open: false,
    },
    {
      question: '¿Qué porcentaje va realmente a las causas?',
      answer: 'Al menos el 70% de lo recaudado va directamente a las ONGs.',
      open: false,
    },
    {
      question: '¿Puedo jugar desde mi móvil?',
      answer: 'Sí, la plataforma es 100% compatible con dispositivos móviles.',
      open: false,
    },
    {
      question: '¿Cómo se eligen las ONGs participantes?',
      answer:
        'Las ONGs pasan por un proceso de verificación antes de participar.',
      open: false,
    },
    {
      question: '¿Qué pasa si no gano ningún premio?',
      answer:
        'Tu aporte igual ayuda a una causa social. ¡Gracias por participar!',
      open: false,
    },
    {
      question: '¿Los bingos son en vivo?',
      answer:
        'Sí, todos nuestros eventos son en vivo con transmisión en directo.',
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
