import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './components/camera/camera.component';
import { CameraLensComponent } from './components/camera/camera-lens/camera-lens.component';
import { CameraRollComponent } from './components/camera/camera-roll/camera-roll.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    CameraLensComponent,
    CameraRollComponent,
    GalleryComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
