import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraService } from 'src/app/services/camera/camera.service';
import { TaggingService } from 'src/app/services/tagging/tagging.service';

import { TaggingComponent } from './tagging.component';

describe('TaggingComponent', () => {
  let component: TaggingComponent;
  let fixture: ComponentFixture<TaggingComponent>;
  let service: TaggingService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggingComponent ],
      providers: [
        CameraService,
        TaggingService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggingComponent);
    service = TestBed.inject(TaggingService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add a tag', done => {
    const evt = { 
      target: {
        getBoundingClientRect: () => ({
          top: 48,
          left: 0,
        })
      },
      offsetX: 100,
      offsetY: 150
    };
    component.addTag(evt as any);
    service.getTagsForPhoto(0).subscribe(tags => {
      expect(tags.tags.length).toBe(1);
      done();
    })
  });
});
