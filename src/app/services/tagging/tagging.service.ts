import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaggingService {

  constructor() { }
  addTag(event: any) {
    // Fetch dims on <img> 
    const imageDims: DOMRect = event.target.getBoundingClientRect();
    console.log(imageDims);
    
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
}
