import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async info(message: string, duration: number = 3000, position: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: 'custom-toast',
      animated: true,
    });

    await toast.present();
  }
}
