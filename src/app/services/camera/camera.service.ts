import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { facingModeEnvironmentLandscapeConfig, facingModeEnvironmentPortraitConfig, facingModeUserLandscapeConfig, facingModeUserPortraitConfig, landscapeMobileUserConfig, portraitMobileUserConfig } from 'src/app/constants/device-configs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraRoll = new BehaviorSubject<any[]>([]);
  private showCameraRoll: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  cameraRoll$ = this.cameraRoll.asObservable();
  showCameraRoll$ = this.showCameraRoll.asObservable();

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
      // default to user camera
      if (window.innerHeight > window.innerWidth) {
        // Return portrait constraints
        return portraitMobileUserConfig;
      }
      return landscapeMobileUserConfig;
    } else {
      const facing = devices.length > 1 ? 'environment' : 'user';
      switch (facing) {
        case 'user':
          if (window.innerHeight > window.innerWidth) {
            return facingModeUserPortraitConfig;
          } 
          else {
            return facingModeUserLandscapeConfig;
          }
        case 'environment':
        default:
          if (window.innerHeight > window.innerWidth) {
            return facingModeEnvironmentPortraitConfig;
          } 
          else {
            return facingModeEnvironmentLandscapeConfig;
          }
      }
      
    }
  }
  addPhotoToCameraRoll(imgSrc: any) {
    const newPhotos = [...this.cameraRoll.value, imgSrc]
    this.cameraRoll.next(newPhotos);
  }
  changeView() {
    this.showCameraRoll.next(!this.showCameraRoll.value);
  }
}
