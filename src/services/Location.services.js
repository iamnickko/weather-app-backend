import User from "../models/User.model.js";

export default class LocationServices {
  addLocation = async ({ email, name, id, coord }) => {
    try {
      if (!email || !name || !id || !coord) {
        throw new Error("Invalid parameters.");
      }
      const dbUser = await User.findOne({ email });
      if (!dbUser) throw new Error("404: User doesn't exist.");
      const existingLocations = dbUser.savedLocations;

      const locationAlreadySaved = existingLocations.some(
        (location) => location.id === id
      );

      if (!locationAlreadySaved) {
        const locationToAdd = { name, id, coord };
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

  removeLocation = async ({ id, email }) => {
    console.log(id);
    console.log(email);
    try {
      if (!email || !id) {
        throw new Error("Invalid parameters.");
      }
      const dbUser = await User.findOne({ email });
      if (!dbUser) throw new Error("404: User doesn't exist.");

      const existingLocations = dbUser.savedLocations;

      const locationExists = existingLocations.some(
        (location) => location.id === id
      );

      if (locationExists) {
        const updatedLocations = existingLocations.filter(
          (location) => location.id !== id
        );
        return await User.findOneAndUpdate(
          { email },
          { savedLocations: updatedLocations },
          { new: true }
        );
      } else {
        throw new Error("Location doesn't exist!");
      }
    } catch (error) {
      throw error;
    }
  };
}
