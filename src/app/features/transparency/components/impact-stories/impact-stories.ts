import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ImpactStory {
  quote: string;
  impact: string;
  name: string;
  role: string;
  emoji: string;
}

@Component({
  selector: 'app-impact-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact-stories.html',
  styleUrl: './impact-stories.scss',
})
export class ImpactStories {
  private http = inject(HttpClient);
  stories: ImpactStory[] = [];

  ngOnInit() {
    this.http.get<ImpactStory[]>('/assets/data/impact-stories.json').subscribe({
      next: (data) => {
        this.stories = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar historias de impacto:', err);
      },
    });
  }
}
