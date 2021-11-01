import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraRollComponent } from './camera-roll.component';

describe('CameraRollComponent', () => {
  let component: CameraRollComponent;
  let fixture: ComponentFixture<CameraRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraRollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
