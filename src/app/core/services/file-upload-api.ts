import { Injectable, inject, NgZone } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadApi {
  private storage: Storage = inject(Storage);
  private ngZone: NgZone = inject(NgZone);

  async uploadFile(file: File): Promise<string> {
    const storageRef = ref(this.storage, `donations/${file.name}`);
    
    // Ejecutar uploadBytes dentro de la zona de Angular
    await this.ngZone.run(() => uploadBytes(storageRef, file));
    
    return getDownloadURL(storageRef);
  }
}
