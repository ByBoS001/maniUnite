import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-stream.html',
  styleUrl: './video-stream.scss',
})
export class VideoStream {
  isFullscreen = signal(false);
  isMuted = signal(false);
  showMiniPlayer = signal(false);
  quality = signal('720p');
  qualities = ['480p', '720p', '1080p'];

  constructor() {
    // Efecto que escucha scroll para mini-player
    effect(() => {
      const handler = () => {
        const scrolled = window.scrollY > 400;
        this.showMiniPlayer.set(scrolled);
      };
      window.addEventListener('scroll', handler);
      return () => window.removeEventListener('scroll', handler);
    });
  }

  toggleFullscreen() {
    this.isFullscreen.set(!this.isFullscreen());
  }

  toggleMute() {
    this.isMuted.set(!this.isMuted());
  }

  setQuality(value: string) {
    this.quality.set(value);
  }

  closeMiniPlayer() {
    this.showMiniPlayer.set(false);
  }

  expandMiniPlayer() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.showMiniPlayer.set(false);
  }
}