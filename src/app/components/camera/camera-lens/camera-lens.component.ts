import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, of } from 'rxjs';
import { catchError, concatMap, debounceTime, tap } from 'rxjs/operators';
import { cameraAnimations } from 'src/app/constants/animations';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-camera-lens',
  templateUrl: './camera-lens.component.html',
  animations: cameraAnimations
})
export class CameraLensComponent implements OnInit, AfterViewInit {
  @ViewChild('video', { static: true }) video!: ElementRef;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  cameraRoll: any[] = [];
  cameraStream: MediaStream | null = null;
  devices: MediaDeviceInfo[] = [];
  showingCamera = true;
  isCameraDisabled = false;
  isCameraSupported = true;
  isCameraSwitchingEnabled = true
  cameraHeight = 0;
  cameraWidth = 0;

  constructor(private cameraService: CameraService, private alertService: AlertService) { }

  ngOnInit(): void {
    // check getUserMedia is not supported by the browser that has the app open
    
    this.isCameraSupported = navigator.mediaDevices && (typeof navigator.mediaDevices.getUserMedia === 'function');
    this.cameraService.cameraRoll$.subscribe(roll => {
      this.cameraRoll = roll.map(img => img);
    });
  }
  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then(() => this.cameraService.getAllCameraDevices())
    .then(devices => {
      this.isCameraSwitchingEnabled = devices.length > 1;
      this.devices = devices.map(i => i);
    })
    .finally(() => {
      this.cameraService.showCameraRoll$
      .pipe(
        tap(showRoll => { this.showingCamera = !showRoll; }),
        concatMap(() => from(this.getCamera(this.devices))),
        catchError(err => {
          console.log(err);
          this.alertService.addAlert(err);
          this.isCameraDisabled = true;
          return of(null)
        })
      )
      .subscribe(stream => {
        console.log(stream);
        this.cameraStream = stream;
        this.video.nativeElement.srcObject = stream;
      })
    });
  }
  getCamera(devices: MediaDeviceInfo[]): Promise<MediaStream | null> {
    if (this.showingCamera && !this.isCameraDisabledOrInUse()) {
      return this.cameraService.getCameraDevice(devices);
    } else {
      return Promise.resolve(null);
    }
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
  async turnOffVideoTracks() {
    try {
      for await (const track of this.cameraStream?.getVideoTracks() ?? []) {
        track.stop()
      }
    } catch (error) {
      // Couldn't stop the camera bc MediaStream isnt set
      // We get here if camera could not load in time
      console.error(`closeCamera() failed because localStream: MediaStream === undefined`);
    }
  }
  goToRoll() {
    this.turnOffVideoTracks().then(() => {
      this.cameraStream = null;
      this.cameraService.changeView();
    });
  }
  isCameraDisabledOrInUse():boolean {
    return this.isCameraDisabled || this.cameraStream != undefined; 
  }
  swapCamera() {
    const track = this.cameraStream?.getVideoTracks();
    console.log(track);
    if (this.isCameraSwitchingEnabled) {
      this.cameraService.swapCamera();
      from(this.turnOffVideoTracks())
      .pipe(
        tap(() => {
          this.cameraStream = null;
        }),
        concatMap(() => from(this.cameraService.getAllCameraDevices())),
        concatMap((devices) => from(this.getCamera(devices))),
        catchError(err => {
          console.log(err);
          this.alertService.addAlert(err);
          this.isCameraDisabled = true;
          return of(null)
        })
      )
      .subscribe((stream) => {
        this.cameraStream = stream;
        this.video.nativeElement.srcObject = stream;
      });
    }
  }
}
