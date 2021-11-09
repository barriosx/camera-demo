import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, debounceTime, tap } from 'rxjs/operators';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-camera-lens',
  templateUrl: './camera-lens.component.html',
})
export class CameraLensComponent implements OnInit {
  @ViewChild('video', { static: true }) video!: ElementRef;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  cameraRoll: any[] = [];
  cameraStream: MediaStream | null = null;
  isCameraDisabled = false;
  cameraHeight = 0;
  cameraWidth = 0;

  constructor(private cameraService: CameraService) { }

  ngOnInit(): void {
    // check getUserMedia is not supported by the browser that has the app open
    const supported = navigator.mediaDevices && (typeof navigator.mediaDevices.getUserMedia === 'function');
    this.cameraService.getCameraFeed(supported).then(stream => {
      console.log(stream);
      this.cameraStream = stream;
      this.video.nativeElement.srcObject = stream;
    })
    .catch(err => {
      console.error(err);
      this.isCameraDisabled = true;
    });
    this.cameraService.cameraRoll$.subscribe(roll => {
      this.cameraRoll = roll.map(img => img);
    });
  }
  onCameraMetadataLoaded(e: any) {
    console.log(e);
    this.cameraHeight = e.target.videoHeight;
    this.cameraWidth = e.target.videoWidth;
  }
  clickPhoto() {
    this.isCameraDisabled = true;
    this.drawVideoToImage(this.canvas.nativeElement.getContext('2d'))
    .pipe(
      debounceTime(150)
    )
    .subscribe(imageSrc => {
      this.isCameraDisabled = false;
      this.cameraService.addPhotoToCameraRoll(imageSrc);
    })
  }
  drawVideoToImage(ctx: CanvasRenderingContext2D) {
    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, this.cameraWidth, this.cameraHeight);
    const src64 = this.canvas.nativeElement.toDataURL();

    return of(src64)
  }
}
