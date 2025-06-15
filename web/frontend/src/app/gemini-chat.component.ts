import { Component } from '@angular/core';
import { GeminiService } from './gemini.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gemini-chat',
  template: `
    <div>
      <h2>Gemini Chat</h2>
      <input [(ngModel)]="prompt" placeholder="Escribe tu pregunta..." />
      <button (click)="askGemini()">Enviar</button>
      <div *ngIf="response">
        <strong>Respuesta:</strong>
        <p>{{ response }}</p>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgIf, FormsModule]
})
export class GeminiChatComponent {
  prompt = '';
  response = '';

  constructor(private geminiService: GeminiService) {}

  askGemini() {
    if (!this.prompt.trim()) return;
    this.geminiService.askGemini(this.prompt).subscribe({
      next: (res) => this.response = res.response,
      error: (err) => this.response = 'Error: ' + (err.error?.error || err.message)
    });
  }
}
