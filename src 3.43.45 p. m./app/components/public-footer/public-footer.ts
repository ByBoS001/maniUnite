import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-public-footer',
  imports: [RouterModule],
  template: `
    <footer class="bg-text text-white px-4 py-10 text-sm">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo y Descripción -->
        <div>
          <a routerLink="/" class="flex items-center gap-2 mb-4">
            <div
              class="bg-primary text-white font-bold rounded-full w-7 h-7 flex items-center justify-center"
            >
              B
            </div>
            <span class="text-base font-semibold">ONG Bingo</span>
          </a>
          <p class="text-textSecondary mb-4">
            Conectamos diversión con propósito social. Cada bingo que juegas
            transforma vidas.
          </p>
          <div class="flex gap-3">
            <span class="bg-white rounded p-1">🌐</span>
            <span class="bg-white rounded p-1">📘</span>
            <span class="bg-white rounded p-1">🎥</span>
            <span class="bg-white rounded p-1">📸</span>
          </div>
        </div>

        <!-- Navegación -->
        <div>
          <h3 class="font-bold mb-3">Navegación</h3>
          <ul class="space-y-2 text-textSecondary">
            <li><a routerLink="/">Inicio</a></li>
            <li><a routerLink="/bingo">Bingos</a></li>
            <li><a routerLink="/donaciones">Donaciones</a></li>
            <li><a routerLink="/transparencia">Transparencia</a></li>
            <li><a routerLink="/blog">Blog</a></li>
          </ul>
        </div>

        <!-- Soporte -->
        <div>
          <h3 class="font-bold mb-3">Soporte</h3>
          <ul class="space-y-2 text-textSecondary">
            <li><a routerLink="/ayuda">Centro de Ayuda</a></li>
            <li><a routerLink="/contacto">Contacto</a></li>
            <li><a routerLink="/como-funciona">Cómo funciona</a></li>
            <li><a routerLink="/seguridad">Seguridad</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="font-bold mb-3">Legal</h3>
          <ul class="space-y-2 text-textSecondary">
            <li><a routerLink="/terminos">Términos de Servicio</a></li>
            <li><a routerLink="/privacidad">Política de Privacidad</a></li>
            <li><a routerLink="/cookies">Cookies</a></li>
            <li><a routerLink="/etica">Código de Ética</a></li>
          </ul>
        </div>
      </div>

      <!-- Footer base -->
      <div
        class="mt-8 border-t border-border pt-4 text-center text-xs text-textSecondary flex flex-col md:flex-row justify-between max-w-7xl mx-auto"
      >
        <span>© 2025 ONG Bingo. Todos los derechos reservados.</span>
        <span class="flex gap-2 justify-center mt-2 md:mt-0">
          Certificado por: <span class="text-green-500">✅ SSL Seguro</span>
          <span class="text-blue-400">🔒 ONGs Verificadas</span>
        </span>
      </div>
    </footer>
  `,
})
export class PublicFooterComponent {}
