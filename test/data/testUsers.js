const testData = {
  testUsers: [
    {
      name: "The Rock",
      email: "paper@scissors.com",
      password: "$2b$10$BoeSx9soIdh9sJCuJZ1ZBOmkZFEFgTpiiOc.722oWO0Zt7oNpOOQe",
      savedLocations: [
        {
          coord: {
            lat: 37.7021,
            lon: -121.9358,
          },
          name: "Dublin",
          apiId: 5344157,
        },
      ],
    },
    {
      name: "Valid Name",
      email: "valid@email.com",
      password:
        "Passw$2b$10$1szlGDHgYtWn0Um8YVKo6.QixzAL9ezkmx2fH9tASx6IiKHuOMTQmord321!",
      savedLocations: [
        {
          name: "London",
          apiId: 2643743,
          coord: {
            lat: 51.5085,
            lon: -0.1257,
          },
        },
      ],
    },
  ],
  newUser: {
    name: "New User",
    email: "newuser@theiremail.com",
    password: "Password123!",
  },
  existingUser: {
    email: "paper@scissors.com",
    password: "",
  },
};

export default testData;
