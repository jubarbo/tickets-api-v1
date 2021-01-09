import { Router } from 'express';
import * as ticketController from '../controllers/ticket.controller';

const router = Router();

router.post('/', ticketController.createTicket);

router.get('/', ticketController.findAllTickets);

router.get('/done', ticketController.findAllDoneTickets);

router.get('/:id', ticketController.findOneTicket);

router.delete('/:id', ticketController.deleteTicket);

router.put('/:id', ticketController.updateTicket);

export default router;
