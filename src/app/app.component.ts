import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

interface Show {
  show: {
    name: string;
    genres: string[];
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bingeSeries';

  query: string = ''; // Track user input for search query
  shows: Show[] = []; // Store search results

  showFeelingSection: boolean = false;
  selectedCategory: string = '';

  moods: string[] = [
    '😄 Happy', '🥲 Sad', '🫥 Thrilling', '🥰 Romantic', '🫡 Exciting',
    '😨 Scary', '🤔 Mystery', '😂 Funny', '😯 Inspiring', '😇 Thoughtful',
    '😎 Action', '😌 Relaxing', '🤩 Adventurous', '😦 Dramatic',
    '😙 Nostalgic', '😮‍💨 Intense', '🤨Suspenseful', '🤬 Angry', '😗 Chilling', '😃 Heartwarming'
  ];

  series: any [] = [];

  seriesName!: string;

  constructor(private http: HttpClient) { }

  searchShows() {
    if (this.query.trim() === '') {
      // Handle empty search query (optional)
      return;
    }

    const apiUrl = `https://api.tvmaze.com/search/shows?q=${this.query}`;
    this.http.get<Show[]>(apiUrl).subscribe(
      (response) => {
        this.shows = response;
        console.log('Search Results:', this.shows);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  getGenres(show: Show): string {
    return show.show.genres.join(', '); // Convert genres array to string
  }

  ngOnInit(): void {

    this.searchShows();
    
    this.getRequest().subscribe(
      (response) => {
        console.log('API Response:', response);
        this.series = response;
        this.seriesName = response[0].show.name;
        console.log('Series Name: ', this.seriesName);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );

  }

  getRequest(): Observable<any> {
    return this.http.get<any>('https://api.tvmaze.com/search/shows?q=sopranos');
  }

  toggleFeelingSection() {
    this.showFeelingSection = true;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.showFeelingSection = true;
  }
}
