const { NorGate, connect_gates } = require("jhtrauntvein-basic-logic-gates");

// initial setup
const top = new NorGate();
const bottom = new NorGate();
top.on((value) => console.log(`top value is ${value}`));
bottom.on((value) => console.log(`bottom value is ${value}`));
console.log(`Top: ${top.evaluate(0)}, Bottom: ${bottom.evaluate()[0]}`);
connect_gates(bottom, 0, top, 1);
console.log("connecting top to bottom");
connect_gates(top, 0, bottom, 0);

// what does R do?
console.log("setting R to true");
top.set(true, 0);
console.log("setting R to false");
top.set(false, 0);

// what does S do?
console.log("setting S to true");
bottom.set(true, 1);
console.log("setting S to false");
bottom.set(false, 1);

// does changing S again change anything?
console.log("changing S to true");
bottom.set(true, 1);
console.log("changing S to false");
bottom.set(false, 1);

// now what does R do?
console.log("setting R to true");
top.set(true, 0);
console.log("setting R to false");
top.set(false, 0);
