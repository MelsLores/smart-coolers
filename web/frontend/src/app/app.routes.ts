import { Routes } from '@angular/router';
import { TicketList } from './ticket-list/ticket-list';
import { TicketForm } from './ticket-form/ticket-form';

export const routes: Routes = [
  { path: '', component: TicketList },
  { path: 'nuevo', component: TicketForm },
  { path: 'editar/:id', component: TicketForm },
];
