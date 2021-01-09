import Ticket from '../models/Ticket';
import { getPagination } from '../libs/getPagination';

export const findAllTickets = async (req, res, next) => {
  try {
    const { size, page, title } = req.query;

    const condition = title
      ? {
          title: { $regex: new RegExp(title), $options: 'i' },
        }
      : {};

    const { limit, offset } = getPagination(page, size);
    const data = await Ticket.paginate(condition, { offset, limit, title });

    // throw new Error('an error')

    res.json({
      totalItems: data.totalDocs,
      tickets: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (err) {
    next(err);
  }
};

export const createTicket = async (req, res, next) => {
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
    next(err);
  }
};

export const findAllDoneTickets = async (req, res, next) => {
  try {
    const doneTickets = await Ticket.find({ done: true });
    res.json(doneTickets);
  } catch (err) {
    next(err);
  }
};

export const findOneTicket = async (req, res, next) => {
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
    next(err);
    // res.status(500).json({
    //   message_error: err.message || `Error retrieving ticket with id: ${id}`,
    // });
  }
};

export const deleteTicket = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({
        error_message: `The ticket with id: ${id} does not exists.`,
      });
    }
    res.json({
      message: `Ticket with id: ${id} was deleted.`,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   message_error: err.message || `Error deleting ticket with id: ${id}`,
    // });
  }
};

export const updateTicket = async (req, res, next) => {
 const id = req.params.id;
  try{
    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body);
    
    if(!updatedTicket) {
      return res.status(404).json({
        error_message: `The ticket with id: ${id} does not exists.`,
      }); 
    }
    res.json({
      message: `Ticket ${id} updated.`,
    });
  }
  catch(err){
    next(err)
  }

 
};
