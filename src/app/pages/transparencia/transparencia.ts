import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Article {
  id: string;
  title: string;
  image: string;
  tag: string;
  date: string;
  readTime: string;
  excerpt: string;
  organization?: string;
  slug: string;
}

@Component({
  selector: 'app-transparencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transparencia.html',
})
export class Transparencia {
  searchTerm = '';
  selectedCategory = 'Todos';
  categories = ['Todos', 'Educación', 'Salud', 'Ambiente'];

  articles: Article[] = [
    {
      id: '1',
      title: 'Proyecto educativo en zonas rurales',
      image: 'assets/image/zonas.webp',
      tag: 'Educación',
      date: '2025-08-01',
      readTime: '4 min',
      excerpt:
        'Iniciativa para proveer material didáctico en comunidades rurales.',
      organization: 'ONG Educar',
      slug: 'proyecto-educativo-rural',
    },
    {
      id: '2',
      title: 'Jornada médica gratuita',
      image: 'assets/image/jornada gratuita.webp',
      tag: 'Salud',
      date: '2025-07-20',
      readTime: '3 min',
      excerpt: 'Se realizó una jornada médica con especialistas voluntarios.',
      organization: 'ONG Saludable',
      slug: 'jornada-medica-gratuita',
    },
    // Puedes agregar más artículos
  ];

  private router = inject(Router);

  get filteredArticles(): Article[] {
    const term = this.searchTerm.toLowerCase();
    return this.articles.filter((article) => {
      const matchesCategory =
        this.selectedCategory === 'Todos' ||
        article.tag === this.selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }

  handleArticleClick(slug: string) {
    this.router.navigate(['/transparencia', slug]);
  }

  getTagColor(tag: string): string {
    const map: Record<string, string> = {
      Educación: '#3B82F6',
      Salud: '#10B981',
      Ambiente: '#F59E0B',
    };
    return map[tag] || '#6B7280';
  }
}
