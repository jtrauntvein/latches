const { OrGate, connect_gates } = require("jhtrauntvein-basic-logic-gates");

const gate = new OrGate();
gate.on((value) => {
   console.log(`Q is ${value}`);
});
connect_gates(gate, 0, gate, 1);
console.log("setting A to true");
gate.set(true, 0);
console.log("setting A to false");
gate.set(false, 0);
