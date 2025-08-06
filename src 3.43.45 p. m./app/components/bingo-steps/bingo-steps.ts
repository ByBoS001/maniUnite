import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface BingoStep {
  number: number;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-bingo-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo-steps.html',
  styleUrl: './bingo-steps.scss',
})
export class BingoSteps {
  private http = inject(HttpClient);
  steps: BingoStep[] = [];

  ngOnInit() {
    this.http
      .get<BingoStep[]>('/assets/data/bingo-steps.json')
      .subscribe({
        next: (data) => {
          this.steps = data;
        },
        error: (err) => {
          console.error('❌ Error al cargar los pasos del bingo:', err);
        },
      });
  }
}