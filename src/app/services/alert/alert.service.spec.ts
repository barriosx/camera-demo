import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { filter } from 'rxjs/operators';
import { Alert } from 'src/app/constants/alert';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be able to add alert', done => {
      service.alert$.pipe(filter(alert => !!alert)).subscribe(alert => {
        console.log(alert);
        
        expect(alert).toBeDefined();
        expect(alert?.title).toEqual('Error');
        done();
      });
      service.addAlert({name: 'Error', message: 'Hello world!'});
  });
});
