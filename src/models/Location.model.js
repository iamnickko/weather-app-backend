import { Schema } from "mongoose";

const locationSchema = new Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true },
    coord: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
  },
  { _id: false }
);

export default locationSchema;
