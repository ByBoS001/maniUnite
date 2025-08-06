import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoStream } from '../../shared/components/video-stream/video-stream';
import { LiveChat } from '../../shared/components/live-chat/live-chat';
import { BingoCards } from '../../shared/components/bingo-cards/bingo-cards';
@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [CommonModule, VideoStream,LiveChat, BingoCards],
  templateUrl: './bingo.html',
  styleUrl: './bingo.scss',
})
export class Bingo {}
