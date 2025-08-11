import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClaimPrize, ClaimPrizeData } from './claim-prize/claim-prize';
type PrizeStatus = 'to-claim' | 'shipped' | 'delivered';

interface UserPrize {
  id: string;
  title: string;
  value: string;
  donatedBy: string;
  wonAt: string;
  bingoName: string;
  image: string;
  status: PrizeStatus;
  trackingMsg?: string;
  deliveredMsg?: string;
}

@Component({
  standalone: true,
  selector: 'app-user-prizes',
  imports: [CommonModule, FormsModule, ClaimPrize],
  templateUrl: './prizes.html'
})
export class UserPrizesPage {

  // Mock de premios (luego lo cambias por tu API)
  prizes: UserPrize[] = [
    {
      id: '1',
      title: 'Tablet Samsung Galaxy',
      value: '$300',
      donatedBy: 'Fundación Educa Más',
      wonAt: '14/1/2025',
      bingoName: 'Bingo por la Educación 2025',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      status: 'to-claim'
    },
    {
      id: '2',
      title: 'Cesta de Productos',
      value: '$80',
      donatedBy: 'Comedores Unidos',
      wonAt: '14/10/2024',
      bingoName: 'Bingo por la Salud',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
      status: 'shipped',
      trackingMsg: 'Tu premio está en camino. Pronto recibirás información de seguimiento.'
    },
    {
      id: '3',
      title: 'Auriculares Bluetooth',
      value: '$120',
      donatedBy: 'Fundación Educa Más',
      wonAt: '—',
      bingoName: '—',
      image: 'https://images.unsplash.com/photo-1518441295580-2f96f3567e56?q=80&w=1200&auto=format&fit=crop',
      status: 'delivered',
      deliveredMsg: '✅ Premio entregado exitosamente. ¡Esperamos que lo disfrutes!'
    }
  ];

  claiming: Record<string, boolean> = {};

  claim(prize: UserPrize) {
    if (prize.status !== 'to-claim') return;

    this.claiming[prize.id] = true;

    // Simula llamada a API
    setTimeout(() => {
      this.claiming[prize.id] = false;
      // Al reclamar, lo pasamos a “enviado”
      prize.status = 'shipped';
      prize.trackingMsg = 'Tu premio está en camino. Pronto recibirás información de seguimiento.';
    }, 1000);
  }

  claimModalOpen = false;
  selectedPrize: any | null = null;

  // podrías traer el nombre real del perfil
  userFullName = 'María González';

  openClaim(prize: any) {
    this.selectedPrize = {
      title: prize.title,
      donatedBy: prize.donatedBy,
      image: prize.image,
    };
    this.claimModalOpen = true;
  }

  closeClaim() {
    this.claimModalOpen = false;
    this.selectedPrize = null;
  }

  submitClaim(data: ClaimPrizeData) {
    // Aquí harías la llamada a tu API con (prizeId + data)
    // Simulación:
    const p = this.prizes.find(x => x.title === this.selectedPrize?.title);
    if (p) {
      p.status = 'shipped';
      p.trackingMsg =
        'Tu premio está en camino. Pronto recibirás información de seguimiento.';
    }
    this.closeClaim();
  }
}