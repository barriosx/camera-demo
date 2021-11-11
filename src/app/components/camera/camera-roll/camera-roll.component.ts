import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { cameraRollAnimations } from 'src/app/constants/animations';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-camera-roll',
  templateUrl: './camera-roll.component.html',
  animations: cameraRollAnimations
})
export class CameraRollComponent implements OnInit {
  show = false;
  images$: Observable<any[]>;
  constructor(private cameraService: CameraService) { 
    this.cameraService.showCameraRoll$.subscribe(show => {
      this.show = show;
    });
    this.images$ = this.cameraService.cameraRoll$;
  }

  ngOnInit(): void { }

  goToCamera() {
    this.cameraService.changeView();
  }
}
