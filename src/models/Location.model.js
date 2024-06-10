import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  name: { type: String, required: true },
  apiId: { type: Number, required: true },
  coord: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
});

const Location = model("Location", locationSchema);

export default Location;
