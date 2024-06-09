import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  eventId: number | null = null;
  images: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
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
