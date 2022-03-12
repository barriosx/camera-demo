import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CameraService } from '../camera/camera.service';
export interface Tag { posX: string, posY: string };
export interface Tags {pos: number, tags: Tag[]}
@Injectable({
  providedIn: 'root'
})
export class TaggingService {

  constructor(private cameraService: CameraService) { }
  createTag(event: any) {
    // Fetch dims on <img> 
    const imageDims: DOMRect = event.target.getBoundingClientRect();
    
    // How we will calculate rendering the tag onto the image

    // First we account for offset between image and the edge of the viewport
    const _x = event.offsetX + (imageDims.left <= 0 ? 0 : imageDims.left);
    const _y = event.offsetY  + (imageDims.top >= 0 ? 0 : imageDims.top);
    
    // Then we subtract to center the circle we will draw at the point selected
    return {
      posX: `calc(${_x}px - 1rem)`,
      posY: `calc(${_y}px - 1rem)`
    }
  }
  addTag(tag: Tag, photo: number) {
    this.cameraService.addTagToOurStorage(tag, photo);
  }
  updateTagsOfPhoto(tags: Tag[], photo: number) {
    this.cameraService.updateTagsOfPhoto(tags, photo);
  }
  getTagsForPhoto(photo: number): Observable<{pos: number, tags: Tag[]}> {
    return this.cameraService.tags$
      .pipe(
        map(tags => tags.find(tag => tag.pos === photo)),
        map(tag => tag ?? {pos: -1, tags: []})
      )
  }
}
