import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private apiUrl = 'http://localhost:3000/gemini';

  constructor(private http: HttpClient) {}

  askGemini(prompt: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.apiUrl, { prompt });
  }
}
