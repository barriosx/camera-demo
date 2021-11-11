import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { filter } from 'rxjs/operators';
import { facingModeEnvironmentLandscapeConfig, facingModeUserLandscapeConfig, landscapeMobileUserConfig } from 'src/app/constants/device-configs';
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
  it('should return null if camera api not supported on the device attempting to consume it', fakeAsync(() => {
    service.getCameraFeed(false).then(response => {
      expect(response).toBeNull(); 
    })
    tick();
  }));
  it('should call camera feed method if supported', fakeAsync(() => {
    const cameraFeedSpy = spyOn(service, 'getCameraFeed');
    service.getCameraFeed(true);
    tick();
    expect(cameraFeedSpy).toHaveBeenCalled();
  }));
  it('should return landscape oriention settings if facing user', () => {
    const supports = { }
    expect(service.loadSupportedConstraints(supports, [])).toEqual(landscapeMobileUserConfig);
  })
  it('should return facing mode landscape oriention settings if facing user', () => {
    const supports = { 
      facingMode: true
    }
    expect(service.loadSupportedConstraints(supports, [])).toEqual(facingModeUserLandscapeConfig);
  })
  it('should return facing mode environment oriention settings if facing user', () => {
    const supports = { 
      facingMode: true
    }
    expect(service.loadSupportedConstraints(supports, mockDevices)).toEqual(facingModeEnvironmentLandscapeConfig);
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
