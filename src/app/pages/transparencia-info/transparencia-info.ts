import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  content: string;
  author: string;
  organizationLogo: string;
}

@Component({
  selector: 'app-transparencia-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transparencia-info.html',
  styleUrl: './transparencia-info.scss',
})
export class TransparenciaInfo implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  article: Article | undefined;

  // TODO: This should be in a service
  private articles: Article[] = [
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
      author: 'Ana Rodríguez, Coordinadora Educativa',
      organizationLogo:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=face',
      content: `
      <p class="mb-4">Es con gran emoción que compartimos una de nuestras historias de éxito más significativas: 50 niños de comunidades rurales han recibido becas escolares completas gracias a los fondos recaudados en nuestros bingos benéficos.</p>
      <h3 class="text-lg font-semibold mt-6">El Programa de Becas</h3>
      <p class="mb-4">El programa "Educación sin Límites" fue diseñado para eliminar las barreras económicas que impiden a los niños rurales acceder a educación de calidad. Cada beca incluye:</p>
      <ul class="list-disc list-inside mb-4">
        <li>📚 <strong>Matrícula completa:</strong> Cubre todo el año escolar</li>
        <li>🎒 <strong>Útiles escolares:</strong> Kit completo de materiales</li>
        <li>👕 <strong>Uniformes:</strong> Dos juegos completos por estudiante</li>
        <li>🚌 <strong>Transporte:</strong> Traslado diario a la escuela</li>
        <li>🍎 <strong>Alimentación:</strong> Desayuno y almuerzo nutritivo</li>
      </ul>
      <h3 class="text-lg font-semibold mt-6">Historias que Inspiran</h3>
      <blockquote class="border-l-4 pl-4 italic text-gray-600">
        "Nunca pensé que podría estudiar. Mis papás trabajan en el campo y el dinero alcanza apenas para comer. Ahora puedo ir a la escuela todos los días y sueño con ser doctora." - Sofía, 9 años, beneficiaria del programa
      </blockquote>
         <div class="prose prose-lg text-gray-800 max-w-none">
      <h2>Impacto en las Familias</h2>
      <ul>
        <li>👨‍👩‍👧‍👦 50 familias de 8 comunidades rurales diferentes</li>
        <li>📈 100% de asistencia escolar entre los becarios</li>
        <li>🏆 Mejora del 40% en calificaciones promedio</li>
        <li>💪 Reducción del trabajo infantil en las comunidades</li>
      </ul>

      <h2>El Proceso de Selección</h2>
      <ul>
        <li>Visitas domiciliarias para evaluar necesidades</li>
        <li>Entrevistas con padres y estudiantes</li>
        <li>Evaluación socioeconómica</li>
        <li>Compromiso de participación familiar</li>
      </ul>

      <h2>Resultados Medibles</h2>
      <ul>
        <li>📊 95% de retención escolar (comparado con 60% promedio regional)</li>
        <li>📈 Mejora significativa en habilidades de lectura y matemáticas</li>
        <li>😊 Mayor autoestima y motivación en los estudiantes</li>
        <li>🤝 Fortalecimiento del vínculo familia-escuela</li>
      </ul>

      <blockquote>
        "Ver a estos niños llegar cada día con una sonrisa, sabiendo que tienen la oportunidad de construir un futuro diferente, no tiene precio. Cada tabla de bingo vendida se convirtió en esperanza."  
        <br />
        <strong>- Directora Elena Martínez, Escuela Rural La Esperanza</strong>
      </blockquote>

      <h2>Agradecimiento a la Comunidad</h2>
      <p>
        Este programa fue posible gracias a la participación de <strong>2,340 personas</strong> que participaron en nuestros bingos educativos.  
        Su generosidad está literalmente cambiando el futuro de estas familias.
      </p>
    </div>
    `,
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
      author: 'Dr. Carlos Pérez, Médico Voluntario',
      organizationLogo:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=face',
            content: `
      <p class="mb-4">El pasado fin de semana, la comunidad se unió para celebrar una jornada de salud que brindó atención médica gratuita a más de 200 personas, incluyendo niños, adultos y ancianos. Este evento fue posible gracias a la colaboración de médicos voluntarios y el apoyo de los participantes de nuestros bingos.</p>
      <h3 class="text-lg font-semibold mt-6">Servicios Ofrecidos</h3>
      <p class="mb-4">Durante la jornada, se ofrecieron una variedad de servicios médicos esenciales para la comunidad:</p>
      <ul class="list-disc list-inside mb-4">
        <li>🩺 <strong>Consulta General:</strong> Diagnóstico y tratamiento de enfermedades comunes.</li>
        <li>🦷 <strong>Salud Dental:</strong> Revisiones, limpiezas y tratamientos básicos.</li>
        <li>👁️ <strong>Oftalmología:</strong> Exámenes de la vista y donación de lentes.</li>
        <li>❤️ <strong>Cardiología:</strong> Chequeos preventivos y electrocardiogramas.</li>
        <li>👶 <strong>Pediatría:</strong> Atención especializada para los más pequeños.</li>
      </ul>
      <h3 class="text-lg font-semibold mt-6">Testimonios de la Comunidad</h3>
      <blockquote class="border-l-4 pl-4 italic text-gray-600">
        "No tengo seguro médico y esta jornada fue una bendición. Pude traer a mis hijos para que los revisaran y me siento muy agradecida por esta oportunidad." - María, madre de tres.
      </blockquote>
         <div class="prose prose-lg text-gray-800 max-w-none">
      <h2>Impacto Directo</h2>
      <ul>
        <li>👨‍⚕️ 25 médicos y enfermeras voluntarios.</li>
        <li>💊 Entrega de medicamentos gratuitos para tratamientos.</li>
        <li>👓 80 pares de lentes donados a personas con problemas de visión.</li>
        <li>💉 150 vacunas aplicadas contra diversas enfermedades.</li>
      </ul>

      <h2>Organización y Logística</h2>
      <p>La planificación de la jornada médica tomó dos meses y requirió la coordinación de múltiples equipos. Se establecieron cinco áreas de atención y se contó con el apoyo de voluntarios para el registro y la orientación de los pacientes. La respuesta de la comunidad fue abrumadora y demostró la necesidad de este tipo de iniciativas.</p>

      <h2>Agradecimientos</h2>
      <p>Agradecemos profundamente a todos los profesionales de la salud que donaron su tiempo y conocimiento, así como a cada persona que, con la compra de una tabla de bingo, contribuyó a hacer realidad esta jornada. ¡Juntos, estamos construyendo una comunidad más saludable!</p>
    </div>
    `,
    },
  ];

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.article = this.articles.find((a) => a.slug === slug);
    }

    if (!this.article) {
      this.router.navigate(['/transparencia']);
    }
  }
}
