import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TicketService, Ticket } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.scss',
  standalone: true,
  imports: [NgFor, HttpClientModule, JsonPipe]
})
export class TicketList implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit() {
    this.ticketService.getTickets().subscribe(tickets => this.tickets = tickets);
  }

  editar(ticket: Ticket) {
    this.router.navigate(['/editar', ticket._id]);
  }
}
