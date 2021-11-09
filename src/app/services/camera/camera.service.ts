import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { facingModeUserLandscapeConfig, landscapeMobileUserConfig } from 'src/app/constants/device-configs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraRoll = new BehaviorSubject<any[]>([]);
  cameraRoll$ = this.cameraRoll.asObservable();
  constructor() { }

  async getCameraFeed(supported: boolean) {
    if (!supported) {
      // either camera is disabled, feature unsupported, or instance of localstream already exists
      return null;
    } else {
      return this.getCameraDevice();
    }
  }
  async getCameraDevice(): Promise<MediaStream> {
      // start video stream via MediaDevices API
      const supports = navigator.mediaDevices.getSupportedConstraints(); 
      const devices = await this.getAllCameraDevices();
      const constraints = this.loadSupportedConstraints(supports,devices);

      return navigator.mediaDevices.getUserMedia(constraints)
  }
  getAllCameraDevices(): Promise<MediaDeviceInfo[]> {
    return navigator.mediaDevices.enumerateDevices()
      .then(devices => devices.filter(device => device.kind === 'videoinput'))
  }
  loadSupportedConstraints(supports: MediaTrackSupportedConstraints, devices: MediaDeviceInfo[]): MediaStreamConstraints {
    if (!supports["facingMode"]) {
      if (window.innerHeight > window.innerWidth) {
        // Return portrait constraints
        return {
          video: {
            width: { min: 270, max: 270 },
            height: { min: 480, max: 480},
          },
          audio: false,
        }
      }
      return landscapeMobileUserConfig
    } else {
      const facing = devices.length > 1 ? 'environment' : 'user';
      if (window.innerHeight > window.innerWidth) {
        return {
          video: {
            facingMode: { ideal: facing },
            height: { 
              min: 480, 
              ideal:720,
              max: 768 
            },
            width: { 
              min: 640, 
              ideal: 960,
              max: 1024
            },
          },
          audio: false,
        }
      } 
      else {
        return facingModeUserLandscapeConfig
      }
    }
  }
  addPhotoToCameraRoll(imgSrc: any) {
    const newPhotos = [...this.cameraRoll.value, imgSrc]
    this.cameraRoll.next(newPhotos);
  }
}
