import { Injectable, inject } from '@angular/core';
import { environment } from '../firebase/firebase.config';
import {
  Firestore,
  addDoc,
  collection,
  serverTimestamp,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FileUploadApi {
  private db = inject(Firestore);

  /**
   * Sube a Cloudinary (unsigned) y devuelve la URL segura.
   * Además, guarda metadatos del upload en Firestore (colección 'uploads').
   */
  async uploadFile(file: File, folder = 'donations'): Promise<string> {
    const { cloudName, uploadPreset } = environment.cloudinary;

    // En unsigned upload NO están permitidos: use_filename, unique_filename
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', uploadPreset);
    if (folder) form.append('folder', folder);

    // Opcional: forzar nombre visible (permitido en unsigned)
    form.append('filename_override', file.name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: 'POST',
        body: form,
      }
    );

    if (!res.ok) {
      let details = '';
      try {
        const j = await res.json();
        details = JSON.stringify(j);
      } catch {
        details = await res.text().catch(() => '');
      }
      throw new Error(`Cloudinary upload failed (${res.status}): ${details}`);
    }

    const json = (await res.json()) as {
      secure_url?: string;
      public_id?: string;
    };
    if (!json.secure_url || !json.public_id) {
      throw new Error('Cloudinary response missing secure_url/public_id');
    }

    await addDoc(collection(this.db, 'uploads'), {
      url: json.secure_url,
      publicId: json.public_id,
      folder,
      createdAt: serverTimestamp(),
    });

    return json.secure_url;
  }
}
