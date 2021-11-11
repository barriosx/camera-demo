import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @ViewChild('image', { static: true }) image!: ElementRef;

  photos$: Observable<any[]>;
  selectedPhotoIndex: number = 0;

  constructor(private cameraService: CameraService) { 
    this.photos$ = this.cameraService.cameraRoll$;
  }

  ngOnInit(): void {
    
  }
  selectPhoto(index: number) {
    this.selectedPhotoIndex = index;
  }

}
