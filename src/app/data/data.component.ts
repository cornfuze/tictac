import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
  HttpClientModule,
  CommonModule
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: any[] = [];

 ngOnInit(): void {
  this.fetchData()
  }

 fetchData() {
  this.httpClient
  .get('https://jsonplaceholder.typicode.com/posts')
  .subscribe((data: any) => {
    console.log(data);
    this.data = data;
  });
 }
}
