import LocationServices from "../services/Location.services.js";

export default class LocationController {
  #service;

  constructor() {
    this.#service = new LocationServices();
  }

  addLocation = async (req, res) => {
    try {
      const message = await this.#service.addLocation(req.body);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };
  removeLocation = async (req, res) => {
    try {
      const message = await this.#service.removeLocation(req.body);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };
}
