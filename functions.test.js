const functions = require("./functions");

//beforeEach(() => initDatabase());
//afterEach(() => closeDatabase());

//beforeAll(() => initDatabase());
//afterAll(() => closeDatabase());

//const initDatabase = () => {
//console.log("Database initiated...");
//};
//const closeDatabase = () => {
//console.log("Database Closed...");
//};

const nameCheck = () => console.log("Checking name...");
describe("Check names", () => {
  beforeEach(() => nameCheck());

  test("user is Jeff", () => {
    const user = "Jeff";
    expect(user).toBe("Jeff");
  });

  test("user is Karen", () => {
    const user = "Karen";
    expect(user).toBe("Karen");
  });
});

// toBe for primitive types
test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

// toBe
test("Adds 2 + 2 to not = equal 5", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

// check for TRUTHY & FALSY values
// toBeNull matches null
// tobeUndefined matches only undefined
// tobeDefined opposite of above
// toBeTruthy matches anything that if statement treats as TRUE
// tobeFalsy matches anything that if statement treats as FALSE

// to beNull
test("Should be null", () => {
  expect(functions.isNull()).toBeNull();
});

// toBeFalsy
test("Should be falsy", () => {
  expect(functions.checkValue(null)).toBeFalsy();
});

// User should be Paul Thomas -  equal for objects non-primitive
test("User should be Paul Thomas", () => {
  expect(functions.createUser()).toEqual({
    firstName: "Paul",
    lastName: "Thomas",
  });
});

// Less than and greater than
test("Should be under 1600", () => {
  const load1 = 800;
  const load2 = 800;
  expect(load1 + load2).toBeLessThanOrEqual(1600);
});

// Regex
test("There is no i in team", () => {
  expect("team").not.toMatch(/I/i);
});

// Arrays
test("Admin should be in usernames", () => {
  usernames = ["John", "Paul", "admin", "Clodagh"];
  expect(usernames).toContain("admin");
});

// Arrays notnom
test("Admin should not be in usernames", () => {
  usernames = ["John", "Paul", "jello", "Clodagh"];
  expect(usernames).not.toContain("admin");
});

// Axios example goto website and get 1st user
// Promise version
test("user should be Leanne Graham promise", () => {
  expect.assertions(1);
  return functions.fetchUser().then((data) => {
    expect(data.name).toEqual("Leanne Graham");
  });
});

// Axios example goto website and get 1st user
// Async await
test("user should be Leanne Graham async", async () => {
  expect.assertions(1);
  const data = await functions.fetchUser();
  expect(data.name).toEqual("Leanne Graham");
});
