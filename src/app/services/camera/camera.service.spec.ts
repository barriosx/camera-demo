import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { filter } from 'rxjs/operators';
import { facingModeEnvironmentLandscapeConfig, facingModeEnvironmentPortraitConfig, facingModeUserLandscapeConfig, facingModeUserPortraitConfig, landscapeMobileUserConfig, portraitMobileUserConfig } from 'src/app/constants/device-configs';
import { CameraService } from './camera.service';

const mockDevices: MediaDeviceInfo[] = [
  { 
    "deviceId": '',
    "groupId": '',
    "kind": 'videoinput',
    "label": 'Front'
  } as MediaDeviceInfo,
  { 
    "deviceId": '',
    "groupId": '',
    "kind": 'videoinput',
    "label": 'Rear'
  } as MediaDeviceInfo
]
describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return landscape oriention settings if facing user', () => {
    const supports = { }
    expect(service.loadSupportedConstraints(supports, false)).toEqual(portraitMobileUserConfig);
  })
  it('should return facing mode landscape oriention settings if facing user', () => {
    const supports = { 
      facingMode: true
    }
    expect(service.loadSupportedConstraints(supports, false)).toEqual(facingModeUserPortraitConfig);
  })
  it('should return facing mode environment oriention settings if facing user', () => {
    const supports = { 
      facingMode: true
    }
    expect(service.loadSupportedConstraints(supports, true)).toEqual(facingModeEnvironmentPortraitConfig);
  })
  it('should add photo to behavior subject', done => {
    service.cameraRoll$
    .pipe(
      filter(imgs => imgs.length > 0)
    )
    .subscribe((imgs) => {
      expect(imgs.length).toBe(1);
      done();
    })
    service.addPhotoToCameraRoll('imgsrc');
  });
  it('should be able to toggle views between camera and roll', done => {
    service.changeView();
    service.showCameraRoll$.subscribe(show => {
      expect(show).toBeTrue();
      done();
    });
  });
});
