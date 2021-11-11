import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CameraService } from 'src/app/services/camera/camera.service';

import { CameraLensComponent } from './camera-lens.component';

describe('CameraLensComponent', () => {
  let component: CameraLensComponent;
  let fixture: ComponentFixture<CameraLensComponent>;
  let service: CameraService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraLensComponent ],
      imports: [
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(CameraService);
    fixture = TestBed.createComponent(CameraLensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load camera meta data onload', () => {
    component.onCameraMetadataLoaded({target: { videoHeight: 100, videoWidth: 100}});
    expect(component.cameraHeight).toBe(100);
    expect(component.cameraWidth).toBe(100);
  });
  it('should not get camera feed if viewing camera roll', () => {
    service.changeView();
    expect(component.showingCamera).toBeFalse();
  });
  it('should call function to show camera roll', fakeAsync(() => {
    component.goToRoll();
    tick();
    expect(component.showingCamera).toBeFalse();
  }));
});
