import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraLensComponent } from './camera-lens.component';

describe('CameraLensComponent', () => {
  let component: CameraLensComponent;
  let fixture: ComponentFixture<CameraLensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraLensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraLensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
