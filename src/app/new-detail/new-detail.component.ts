import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css'],
})
export class NewsDetailComponent implements OnInit {
  newsId: number = 0;
  newsTitle: string = '';
  newsImage: string = '';
  newsInfo: string = '';
  newId: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.newId = params['id'];
      console.log('New ID:', this.newId);

      // Obtener los datos del JSON
      this.http.get<any[]>('assets/data.json').subscribe((data) => {
        // Buscar el objeto con el ID correspondiente
        const selectedNews = data.find((news) => news.id === +this.newId);
        if (selectedNews) {
          // Si se encuentra el objeto, asignar sus propiedades a las variables
          this.newsTitle = selectedNews.titulo;
          this.newsImage = selectedNews.imagen;
          this.newsInfo = selectedNews.info;
          console.log('News Title:', this.newsTitle);
          console.log('News Image:', this.newsImage);
          console.log('News Info:', this.newsInfo);
        } else {
          // Manejar el caso en que no se encuentre ninguna noticia con el ID proporcionado
          console.log('No se encontró ninguna noticia con el ID:', this.newId);
        }
      });
    });
  }
}
