import { Component } from '@angular/core';

@Component({
  selector: 'app-transparencia-info',
  imports: [],
  templateUrl: './transparencia-info.html',
  styleUrl: './transparencia-info.scss',
})
export class TransparenciaInfo {
  article = {
    title: 'Historia de éxito: 50 niños reciben becas escolares',
    date: '28 Ene 2025',
    readTime: '4 min',
    tag: 'Historia de Éxito',
    author: 'Ana Rodríguez, Coordinadora Educativa',
    organization: 'Fundación Educa Más',
    organizationLogo:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=face',
    image:
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop',
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
  };
}
