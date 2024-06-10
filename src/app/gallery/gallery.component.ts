import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery',
  standalone:true,
  imports:[CommonModule,NgbCarouselModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @ViewChild('carousel') carousel!: NgbCarousel; 

  eventId: number | null = null;
  images: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {


    console.log("gallery inciado")
    this.eventId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;

    if (this.eventId) {
      this.loadImages();
    }
  }

  loadImages(): void {
    for (let i = 1; i <= 10; i++) {
      this.images.push(`../assets/images/galeria/${i}.jpg`);
    }
  }
}
