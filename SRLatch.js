const { NorGate, connect_gates } = require("jhtrauntvein-basic-logic-gates");

/**
 * Defines a digital device that can latch current values of inputs and be reset 
 * back to its current state.
 * @type {@import("jhtrauntvein-basic-logic-gates").GateInterface} implements the gate interface with two inputs
 * and two outputs
 */
class SrLatch {
   #g1;
   #g2;

   constructor() {
      this.#g1 = new NorGate();
      this.#g2 = new NorGate();
      connect_gates(this.#g2, 0, this.#g1, 1);
      connect_gates(this.#g1, 0, this.#g2, 0);
   }

   /**
    * Sets the current value of a device input.
    * @param {boolean} value specifies the value to set for the input
    * @param {number} channel specifies the input channel to set.  a value of 0 will set the R input while a value of 1 specifies the S input
    * @returns {boolean[]} returns the steady state of outputs after the inputs are set.  The first is the Q value and the second is the NOT(Q) 
    * value.
    */
   set(value, channel) {
      if(channel === 0) {
         this.#g1.set(value, 0);
      }
      else {
         this.#g2.set(value, 1);
      }
      return this.evaluate();
   }

   /**
    * Sets up an event handler that will be called after one of the inputs has been changed
    * @param {@import("jhtrauntvein-basic-logic-gates").OutputHandlerType} handler specifies the function that will be called 
    * with the given output channel's value after an input has been changed
    * @param {number} channel specifies the channel on which the handelr will be registered.  a value of 0 will 
    * monitor the Q output and a value of 1 will monitor the NOT(Q) output 
    */
   on(handler, channel) {
      if(channel === 0) {
         this.#g1.on((value) => {
            handler(value, 0, this);
         });
      }
      else {
         this.#g2.on((value) => {
            handler(value, 1, this);
         });
      }
   }

   /**
    * @returns {boolean[]} evaluates the current output's state and returns these as a two value array.
    * the first element is the Q output and the second element is the NOT(Q) output
    */
   evaluate() {
      return [ this.#g1.evaluate()[0], this.#g2.evaluate()[0] ];
   }
};

module.exports = {
   SrLatch
}