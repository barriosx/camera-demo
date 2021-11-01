import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-camera-lens',
  templateUrl: './camera-lens.component.html',
})
export class CameraLensComponent implements OnInit {
  @ViewChild('video', { static: true }) video!: ElementRef;
  cameraStream: MediaStream | null = null;
  cameraHeight = 0;
  cameraWidth = 0;

  constructor(private cameraService: CameraService) { }

  ngOnInit(): void {
    this.cameraService.getCameraFeed().then(stream => {
      console.log(stream);
      this.cameraStream = stream;
      this.video.nativeElement.srcObject = stream;
    })
    .catch(err => {
      console.error(err);
    });
  }
  onCameraMetadataLoaded(e: any) {
    console.log(e);
    this.cameraHeight = e.target.videoHeight;
    this.cameraWidth = e.target.videoWidth;
  }
}
