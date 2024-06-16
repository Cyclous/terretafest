import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [NgbCarouselConfig]
})
export class GalleryComponent {
  images = [
    { url: '../assets/images/galeria/1.jpg' },
    { url: '../assets/images/galeria/2.jpg' },
    { url: '../assets/images/galeria/3.jpg' },
    { url: '../assets/images/galeria/4.jpg' },
    { url: '../assets/images/galeria/5.jpg' },
    { url: '../assets/images/galeria/6.jpg' },
    { url: '../assets/images/galeria/7.jpg' },
    { url: '../assets/images/galeria/8.jpg' },
    { url: '../assets/images/galeria/9.jpg' }
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }
}
