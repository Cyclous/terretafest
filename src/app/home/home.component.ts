import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any = [];
  displayedData: any = [];
  itemsPerPage: number = 6;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/data.json').subscribe((data) => {
      this.data = data;
      this.displayedData = this.data.slice(0, this.itemsPerPage);
    });
  }

  loadMore(): void {
    const startIndex = this.displayedData.length;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.data.length);
    this.displayedData = this.displayedData.concat(
      this.data.slice(startIndex, endIndex)
    );
  }
  loadLess(): void {
    this.displayedData = this.data.slice(0, this.itemsPerPage);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollHeight = event.target.documentElement.scrollHeight;
    const scrollTop = event.target.documentElement.scrollTop;
    const clientHeight = event.target.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      this.loadMore();
    }
  }
}
