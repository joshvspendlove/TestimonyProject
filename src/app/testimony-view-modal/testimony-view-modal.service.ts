import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonyViewModalService {
  modalState = new Subject<boolean>();

  openModal() {
    this.modalState.next(true);
  }

  closeModal() {
    this.modalState.next(false);
  }
}
