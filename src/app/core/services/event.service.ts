import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private reloadHistoriesSubject = new Subject<void>();
  private reloadProgressesSubject = new Subject<void>();

  triggerReloadHistories() {
    this.reloadHistoriesSubject.next();
  }

  getReloadHistories(): Observable<void> {
    return this.reloadHistoriesSubject.asObservable();
  }

  triggerReloadProgresses() {
    this.reloadProgressesSubject.next();
  }

  getReloadProgresses(): Observable<void> {
    return this.reloadProgressesSubject.asObservable();
  }
}
