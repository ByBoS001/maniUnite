import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface OngBenefit {
  icon: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-ong-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ong-benefits.html',
  styleUrl: './ong-benefits.scss',
})
export class OngBenefits {
  private http = inject(HttpClient);
  benefits: OngBenefit[] = [];

  ngOnInit() {
    this.http
      .get<OngBenefit[]>('/assets/data/ong-benefits.json')
      .subscribe({
        next: (data) => {
          this.benefits = data;
        },
        error: (err) => {
          console.error('❌ Error al cargar JSON de beneficios:', err);
        },
      });
  }
}
