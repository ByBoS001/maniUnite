import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngBenefits } from '../../components/ong-benefits/ong-benefits';
import { PartnersLogos } from '../../components/partners-logos/partners-logos';
import { BingoSteps } from '../../components/bingo-steps/bingo-steps';
import { UpcomingBingos } from '../../features/events/components/upcoming-bingos/upcoming-bingos';
import { ImpactCards } from '../../features/transparency/components/impact-cards/impact-cards';
import { ImpactStories } from '../../features/transparency/components/impact-stories/impact-stories';
import { NotifySubscription } from '../../shared/components/notify-subscription/notify-subscription';
import { FaqAccordion } from '../../components/faq/faq';
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    OngBenefits,
    PartnersLogos,
    BingoSteps,
    UpcomingBingos,
    ImpactCards,
    ImpactStories,
    NotifySubscription,
    FaqAccordion,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
