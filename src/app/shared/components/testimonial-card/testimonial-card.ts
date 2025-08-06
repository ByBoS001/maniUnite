import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-testimonial-card',
    imports: [CommonModule],
  templateUrl: './testimonial-card.html',
})
export class TestimonialCard {
  @Input() quote = '';
  @Input() author = '';
  @Input() role = '';
  @Input() impact = '';
  @Input() image = '';
  @Input() color = 'bg-cyan-500'; // default
}