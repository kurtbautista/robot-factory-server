module.exports = () => {
  const data = {
    robots: [],
  };

  for (let i = 0; i < 10; i++) {
    data.robots.push({
      id: i,
      name: `Robot ${i}`,
      configuration: {
        hasSentience: false,
        hasWheels: false,
        hasTracks: false,
        numberOfRotors: 1,
        Colour: "blue",
      },
      statuses: ["on fire", "rusty", "loose screws", "paint", "scratched"],
    });
  }
};
