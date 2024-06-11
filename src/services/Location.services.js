import User from "../models/User.model.js";

export default class LocationServices {
  addLocation = async ({ email, name, apiId, coord }) => {
    try {
      if (!email || !name || !apiId || !coord) {
        throw new Error("Invalid parameters.");
      }
      const dbUser = await User.findOne({ email });
      if (!dbUser) throw new Error("404: User doesn't exist.");
      const existingLocations = dbUser.savedLocations;

      const locationAlreadySaved = existingLocations.some(
        (location) => location.apiId === apiId
      );

      if (!locationAlreadySaved) {
        const locationToAdd = { name, apiId, coord };
        const updateLocations = [...existingLocations, locationToAdd];
        return await User.findOneAndUpdate(
          { email },
          { savedLocations: updateLocations },
          { new: true }
        );
      } else {
        throw new Error("Location is already saved!");
      }
    } catch (error) {
      throw error;
    }
  };
}
