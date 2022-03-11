import { TestBed } from '@angular/core/testing';

import { TaggingService } from './tagging.service';

describe('TaggingService', () => {
  let service: TaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a tag', () => {
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
    expect(service.addTag(evt)).toEqual({
      posX: 'calc(100px - 1rem)',
      posY: `calc(150px - 1rem)`
    });
  });
});
