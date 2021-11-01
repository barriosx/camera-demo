import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async getCameraFeed() {
    // check getUserMedia is not supported by the browser that has the app open
    const supported = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
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
      return {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
        },
        audio: false,
      }
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
        return {
          video: {
            facingMode: { ideal: facing },
            width: {
              min: 1280,
              ideal: 1920,
              max: 2560,
            },
            height: {
              min: 720,
              ideal: 1080,
              max: 1440,
            },
          },
          audio: false,
        }
      }
    }
  }

}
