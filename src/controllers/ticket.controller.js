import Ticket from '../models/Ticket';
import { getPagination } from '../libs/getPagination';

export const findAllTickets = async (req, res) => {
  try {
    const { size, page, title } = req.query;

    const condition = title
      ? {
          title: { $regex: new RegExp(title), $options: 'i' },
        }
      : {};

    const { limit, offset } = getPagination(page, size);
    const data = await Ticket.paginate(condition, { offset, limit, title });
    res.json({
      totalItems: data.totalDocs,
      tickets: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1 
    });


  } catch (err) {
    res.status(500).json({
      message_error:
        err.message || 'Ups... something went wrong, please try in a while.',
    });
  }
};

export const createTicket = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      error_message: 'Title is required',
    });
  }

  if (!req.body.description) {
    return res.status(400).send({
      error_message: 'Description is required',
    });
  }

  try {
    const newTicket = new Ticket({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false,
    });
    const ticketSaved = await newTicket.save();
    res.json(ticketSaved);
  } catch (err) {
    res.status(500).json({
      message_error:
        err.message || 'Ups... something went wrong, please try in a while.',
    });
  }
};

export const findAllDoneTickets = async (req, res) => {
  const doneTickets = await Ticket.find({ done: true });
  res.json(doneTickets);
};

export const findOneTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({
        error_message: `The ticket with id ${id} does not exists.`,
      });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({
      message_error: err.message || `Error retrieving ticket with id: ${id}`,
    });
  }
};

export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    await Ticket.findByIdAndDelete(id);
    res.json({
      message: `Ticket ${id} deleted.`,
    });
  } catch (err) {
    res.status(500).json({
      message_error: err.message || `Error deleting ticket with id: ${id}`,
    });
  }
};

export const updateTicket = async (req, res) => {
  await Ticket.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    message: `Ticket ${req.params.id} updated.`,
  });
};
