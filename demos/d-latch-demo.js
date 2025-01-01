const { DLatch } = require("../DLatch.js");
const latch = new DLatch();

latch.on((value) => console.log(`latched value is ${value}`));
console.log("setting D to true");
latch.set_d(true);
console.log("setting E to true");
latch.set_enable(true);

console.log("setting D to false");
latch.set_d(false);
console.log("setting E to false");
latch.set_enable(false);
console.log("setting D to false");
latch.set_d(false);
console.log(`latch state is ${latch.evaluate()[0]}`);

