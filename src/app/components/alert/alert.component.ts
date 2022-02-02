import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert } from 'src/app/constants/alert';
import { alertAnimation } from 'src/app/constants/animations';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  animations: alertAnimation,
})
export class AlertComponent implements OnInit {
  alert$: Observable<Alert | undefined>;
  constructor(private service: AlertService) { 
    this.alert$ = this.service.alert$;
  }

  ngOnInit(): void { }
  closeAlert() {
    this.service.addAlert(undefined);  
  }
}
