import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TicketService, Ticket } from '../ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.scss',
  standalone: true,
  imports: [FormsModule, HttpClientModule]
})
export class TicketForm implements OnInit {
  ticket: Ticket = { title: '', description: '' };
  isEdit = false;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    public router: Router // Cambiado a public
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.ticketService.getTickets().subscribe(tickets => {
        const found = tickets.find(t => t._id === id);
        if (found) this.ticket = found;
      });
    }
  }

  guardar() {
    if (this.isEdit && this.ticket._id) {
      this.ticketService.updateTicket(this.ticket._id, this.ticket).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.ticketService.createTicket(this.ticket).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
