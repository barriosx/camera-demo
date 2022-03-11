import { Component, Input, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera/camera.service';
import { TaggingService } from 'src/app/services/tagging/tagging.service';

@Component({
  selector: 'app-tagging',
  templateUrl: './tagging.component.html',
  styleUrls: ['./tagging.component.scss']
})
export class TaggingComponent implements OnInit {
  @Input() photo!: number;
  $photos;
  tags: {posX: string, posY: string }[] = [];
  constructor(
    private cameraService: CameraService, 
    private taggingService: TaggingService) { 
      this.$photos = this.cameraService.cameraRoll$
  }

  ngOnInit(): void {
  }


  onImageLoad(image: Event) {
    console.log(image);
  }
  addTag(event: MouseEvent) {
    console.log(event)
    this.tags.push(this.taggingService.addTag(event))
  }

}
