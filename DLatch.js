const { NotGate, AndGate, connect_gates } = require("jhtrauntvein-basic-logic-gates");
const { SrLatch } = require("./SRLatch.js");

/**
 * @type {import("jhtrauntvein-basic-gates").GateInterface} implements a composition of five gates
 */
class DLatch {
   #inverter;
   #input1;
   #input2;
   #latch;
   
   constructor() {
      this.#inverter = new NotGate();
      this.#input1 = new AndGate();
      this.#input2 = new AndGate();
      this.#latch = new SrLatch();
      connect_gates(this.#inverter, 0, this.#input1, 0);
      connect_gates(this.#input1, 0, this.#latch, 0)
      connect_gates(this.#input2, 0, this.#latch, 1);
   }

   /**
    * Sets the value of one of the input channels
    * @param {boolean} value specifies the input channel value
    * @param {number} channel specifies the input channel to set:
    *   - 0: the value will be set on the D input
    *   - 1: the value will be set on the ENABLE input
    * @returns 
    */
   set(value, channel) {
      if(channel === 0) {
         this.#inverter.set(value, 0);
         this.#input2.set(value, 1);
      }
      else {
         this.#input1.set(value, 1);
         this.#input2.set(value, 0);
      }
      return this.evaluate();
   }

   /**
    * 
    * @returns {boolean[]} Returns the current state of outputs.  The positions in the array correspond with the following output channels:
    *   - 0: Q output
    *   - 1: NOT(Q) output
    */
   evaluate() {
      return this.#latch.evaluate();
   }

   /**
    * Registers an output handler function that will be called when one of the input values have been set
    * @param {@import("jhtrauntvein-basic-logic-gates").OutputHandlerType} handler specifies the function that will be called 
    * for the given output channel when one of the inputs has been set.
    * @param {number?} channel specifies the channel for which the listener will be registered.  The following values are 
    * supported:
    *    - 0: Q output
    *    - 1: NOT(Q) output 
    */
   on(handler, channel = 0) {
      this.#latch.on((value) => {
         handler(value, channel, this);
      }, channel);
   }

   /**
    * Sets the value of the D input
    * @param {boolean} value specifies the value of D
    * @return {boolean[]} returns the evaluated state
    */
   set_d(value) {
      return this.set(value, 0);
   }

   /**
    * Sets the value of the ENABLE input
    * @param {boolean} value specifies the value of CLK
    * @return {boolean[]} returns the evaluated state
    */
   set_enable(value) {
      return this.set(value, 1);
   }

   /**
    * @return {boolean} returns the cached value for the given input channel
    * @param {number} channel specifies the input channel.  Must be one of:
    * - 0: reset line
    * - 1: set line
    */
   get_input(channel) {
      let rtn;
      if(channel === 0) {
         rtn = this.#input1.get_input(0);
      }
      else if(channel === 1) {
         rtn = this.#input2.get_input(1);
      }
      else {
         throw Error(`invalid channel value: ${channel}`);
      }
      return rtn;
   }
};

module.exports = {
   DLatch
};
