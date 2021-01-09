import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      trim: true,
      maxlength: 3000
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ticketSchema.plugin(mongoosePaginate);

export default model('Ticket', ticketSchema);
