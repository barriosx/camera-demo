import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CameraService } from 'src/app/services/camera/camera.service';
import { Tag, TaggingService } from 'src/app/services/tagging/tagging.service';

@Component({
  selector: 'app-tagging',
  templateUrl: './tagging.component.html',
  styleUrls: ['./tagging.component.scss']
})
export class TaggingComponent implements OnInit {
  @Input() photo!: number;
  $photos;
  tags: Tag[] = [];
  constructor(
    private cameraService: CameraService, 
    private taggingService: TaggingService) { 
      this.$photos = this.cameraService.cameraRoll$
  }

  ngOnInit(): void {
  }


  onImageLoad(image: Event) {
    this.taggingService.getTagsForPhoto(this.photo)
    .pipe(take(1))
    .subscribe(tag => {
      this.tags = tag.tags.map(tag => tag)
    })
  }
  addTag(event: MouseEvent) {
    const tag = this.taggingService.createTag(event);
    this.taggingService.addTag(tag, this.photo);
    this.tags.push({...tag});
  }
  removeTag(photo: number, i: number) {
    this.tags = this.tags.filter((tag, index) => index !== i);
    this.taggingService.updateTagsOfPhoto(this.tags, photo);
  }
}
