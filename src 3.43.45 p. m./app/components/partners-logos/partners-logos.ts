import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  private http = inject(HttpClient);
  partners: Partner[] = [];

  ngOnInit() {
    this.http
      .get<Partner[]>('/assets/data/partners.json')
      .subscribe({
        next: (data) => (this.partners = data),
        error: (err) => console.error('❌ Error al cargar los aliados:', err),
      });
  }
}