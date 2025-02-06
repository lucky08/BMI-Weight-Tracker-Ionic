import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private reloadHistoriesSubject = new Subject<void>();

  triggerReloadHistories() {
    this.reloadHistoriesSubject.next();
  }

  getReloadHistories(): Observable<void> {
    return this.reloadHistoriesSubject.asObservable();
  }
}
