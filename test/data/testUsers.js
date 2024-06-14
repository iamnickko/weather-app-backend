const testData = {
  testUsers: [
    {
      name: "The Rock",
      email: "paper@scissors.com",
      password: "Password456!",
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
      password: "Password789!",
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
    name: "The Rock",
    email: "paper@scissors.com",
    password: "Password456!",
  },
};

export default testData;
