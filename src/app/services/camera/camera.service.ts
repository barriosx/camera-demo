import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { facingModeEnvironmentLandscapeConfig, facingModeEnvironmentPortraitConfig, facingModeUserLandscapeConfig, facingModeUserPortraitConfig, landscapeMobileUserConfig, portraitMobileUserConfig } from 'src/app/constants/device-configs';
import { Tag, Tags } from '../tagging/tagging.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraRoll = new BehaviorSubject<any[]>([]);
  private showCameraRoll: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  private tags = new BehaviorSubject<Tags[]>([]);
  cameraRoll$ = this.cameraRoll.asObservable();
  showCameraRoll$ = this.showCameraRoll.asObservable();
  tags$ = this.tags.asObservable();

  showEnvironment = true;
  constructor() { }

  async getCameraDevice(devices: MediaDeviceInfo[]): Promise<MediaStream> {
      // start video stream via MediaDevices API
      const supports = navigator.mediaDevices.getSupportedConstraints(); 
      
      let constraints = undefined;
      console.log('Devices:', devices);
      if (devices.length > 1) {
        constraints = this.loadSupportedConstraints(supports, this.showEnvironment)
      } else {
        constraints = this.loadSupportedConstraints(supports,false);
      }

      return navigator.mediaDevices.getUserMedia(constraints)
  }
  getAllCameraDevices(): Promise<MediaDeviceInfo[]> {
    return navigator.mediaDevices.enumerateDevices()
      .then(devices => devices.filter(device => device.kind === 'videoinput'))
  }
  loadSupportedConstraints(supports: MediaTrackSupportedConstraints, faceEnvironment: boolean): MediaStreamConstraints {
    if (!supports["facingMode"]) {
      // default to user camera
      if (window.innerHeight > window.innerWidth) {
        // Return portrait constraints
        return portraitMobileUserConfig;
      }
      return landscapeMobileUserConfig;
    } else {
      switch (faceEnvironment) {
        case false:
          if (window.innerHeight > window.innerWidth) {
            return facingModeUserPortraitConfig;
          } 
          else {
            return facingModeUserLandscapeConfig;
          }
        case true:
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
  swapCamera() {
    this.showEnvironment = !this.showEnvironment;
  }
  addTagToOurStorage(tagData: Tag, photo: number) {
    const photoTags = this.tags.value.find(tag => tag.pos === photo);
    if (!photoTags) {
      this.tags.next([...this.tags.value, {pos: photo, tags: [{...tagData}] }])
    } else {
      // adding to existing list of tags stored
      const newTags: Tags = {pos: photo, tags: [...photoTags.tags, {...tagData}]};
      const newList = this.tags.value.map((tag) => (tag.pos === photo ? newTags : tag))
      this.tags.next(newList);
    }
  }
  updateTagsOfPhoto(tagData: Tag[], photo: number) {
    const photoTags = this.tags.value.find(tag => tag.pos === photo);
    if (!photoTags) {
      // photo doesnt have tags attached
    } else {
      // adding to existing list of tags stored
      const newTags: Tags = {pos: photo, tags: tagData.map(t => t)};
      const newList = this.tags.value.map((tag) => (tag.pos === photo ? newTags : tag))
      this.tags.next(newList);
    }
  }
}
