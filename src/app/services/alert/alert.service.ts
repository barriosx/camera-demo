import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from 'src/app/constants/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {  
  private alert = new BehaviorSubject<Alert | undefined>(undefined);
  alert$ = this.alert.asObservable();

  constructor() { }

  addAlert(alert: any) {
    if(alert) {
      const newAlert = {
        title: alert.name,
        message: alert.message
      }
      this.alert.next(newAlert);
    } else {
      this.alert.next(alert);
    }
  }
}
