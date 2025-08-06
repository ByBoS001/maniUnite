import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bingo-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo-cards.html',
  styleUrl: './bingo-cards.scss',
})
export class BingoCards {
  // Simula una tabla de bingo (5x5)
  bingoGrid = signal<(number | 'FREE')[][]>([
    [5, 21, 36, 57, 65],
    [4, 25, 39, 60, 61],
    [14, 30, 'FREE', 59, 73],
    [9, 19, 31, 48, 62],
    [9, 27, 40, 50, 75],
  ]);

  marked = signal<boolean[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );

  get totalMarked() {
    return this.marked().flat().filter(Boolean).length;
  }

  markCell(row: number, col: number) {
    if (this.bingoGrid()[row][col] !== 'FREE') {
      this.marked.update((m) => {
        const copy = m.map((r) => [...r]);
        copy[row][col] = !copy[row][col];
        return copy;
      });
    }
  }

  markAllColumn(colIndex: number) {
    this.marked.update((m) => {
      const copy = m.map((r, i) => [...r]);
      for (let i = 0; i < copy.length; i++) {
        if (this.bingoGrid()[i][colIndex] !== 'FREE') {
          copy[i][colIndex] = true;
        }
      }
      return copy;
    });
  
    
  }

  clearMarks() {
    this.marked.set(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false))
    );
  }

  getRemaining() {
    return 25 - this.totalMarked;
  }
}
