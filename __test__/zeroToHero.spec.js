const pizzas = require("../data.json");

test("the pizza data is correct", () => {
  expect(pizzas).toMatchSnapshot();
  expect(pizzas).toHaveLength(4);
  expect(pizzas.map((pizza) => pizza.name)).toEqual([
    "Chicago Pizza",
    "Neapolitan Pizza",
    "New York Pizza",
    "Sicilian Pizza",
  ]);
});

for (let i = 0; i < pizzas.length; i += 1) {
  test(`pizza[${i}] should have properties (id, name, image, desc, price)`, () => {
    expect(pizzas[i]).toHaveProperty("id");
    expect(pizzas[i]).toHaveProperty("name");
    expect(pizzas[i]).toHaveProperty("image");
    expect(pizzas[i]).toHaveProperty("desc");
    expect(pizzas[i]).toHaveProperty("price");
    expect(pizzas[i]).not.toHaveProperty("crazy_price");
  });
}

test("mock implemntation of a basic function", () => {
  const mock = jest.fn(() => "I am a mock function");
  expect(mock("calling my mock function !")).toBe("I am a mock function");
  expect(mock).toHaveBeenCalledWith("calling my mock function !");
});

test("mock return value of a function one time", () => {
  const mock = jest.fn();
  mock.mockReturnValueOnce("Hello").mockReturnValueOnce("there!");
  mock();
  mock();
  expect(mock).toHaveBeenCalledTimes(2);
  mock("Hello", "there!", "Steve");
  expect(mock).toHaveBeenCalledWith("Hello", "there!", "Steve");
  mock("Paul");
  expect(mock).toHaveBeenLastCalledWith("Paul");
});

test("mock implementation of a function", () => {
  const mock = jest.fn().mockImplementation(() => "United Kingdom");
  expect(mock("Location")).toBe("United Kingdom");
  expect(mock).toHaveBeenCalledWith("Location");
});

test("spying using original implementation", () => {
  const pizza = {
    name: (n) => `Pizza Name: ${n}`,
  };
  const spy = jest.spyOn(pizza, "name");
  expect(pizza.name("Cheese")).toBe("Pizza Name: Cheese");
  expect(spy).toHaveBeenCalledWith("Cheese");
});

test("spying using mock implementation", () => {
  const pizza = {
    name: (n) => `Pizza Name: ${n}`,
  };
  const spy = jest.spyOn(pizza, "name");
  spy.mockImplementation((n) => `Crazy pizza!`);
  expect(pizza.name("Cheese")).toBe("Crazy pizza!");
  spy.mockRestore();
  expect(pizza.name("Cheese")).toBe("Pizza Name: Cheese");
});

test("pizza returns new york last", () => {
  const pizza1 = pizzas[0];
  const pizza2 = pizzas[1];
  const pizza3 = pizzas[2];
  const pizza = jest.fn((currentPizza) => currentPizza.name);

  pizza(pizza1); // Chicago Pizza
  pizza(pizza2); // neopolitan Pizza
  pizza(pizza3); // new york Pizza

  expect(pizza).toHaveLastReturnedWith("New York Pizza");
});

// Data matching.....
test("pizza data has new york data and matches object", () => {
  const newYorkPizza = {
    id: 3,
    name: "New York Pizza",
    image: "/images/ny-pizza.jpg",
    desc:
      "New York-style pizza has slices that are large and wide with a thin crust that is foldable yet crispy. It is traditionally topped with tomato sauce and mozzarella cheese.",
    price: 8,
  };
  expect(pizzas[2]).toMatchObject(newYorkPizza);
});

test("expect a promise to resolve", async () => {
  const user = {
    getFullName: jest.fn(() => Promise.resolve("Paul Thomas")),
  };
  await expect(user.getFullName("Paul Thomas")).resolves.toBe("Paul Thomas");
});

test("expect a promise to reject", async () => {
  const user = {
    getFullName: jest.fn(() =>
      Promise.reject(new Error("Something went wrong"))
    ),
  };
  await expect(user.getFullName("Paul Thomas")).rejects.toThrow(
    "Something went wrong"
  );
});
