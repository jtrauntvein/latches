# Logic Latches Components

This module contains components that can be used to emulate latch objects within a 
JavaScript program.  It also includes unit tests and another directory that 
illustrates using the latches in independent programs.

- [1. What is a Latch?](#1-what-is-a-latch)
- [2. class `SrLatch`](#2-class-srlatch)
  - [2.1. API](#21-api)
    - [2.1.1. `set()`](#211-set)
    - [2.1.2. `on()`](#212-on)
    - [2.1.3. `evaluate()`](#213-evaluate)
  - [2.2. Example](#22-example)
- [3. class `DLatch`](#3-class-dlatch)
  - [3.1. API](#31-api)
    - [3.1.1. `set_d()` Sets the Data Line](#311-set_d-sets-the-data-line)
    - [3.1.2. `set_enable()` Sets the Enable Line](#312-set_enable-sets-the-enable-line)
    - [3.1.3. `on()` Add A Monitor Function](#313-on-add-a-monitor-function)
    - [3.1.4. `set()` Set an Input Line](#314-set-set-an-input-line)
  - [3.2. Example](#32-example)


## 1. What is a Latch?

A latch is a digital device that is able to store a single bit of data under the control
of its inputs.

## 2. class `SrLatch` 

An S-R latch is the simplest of these in that its output can be asserted
when its `SET` input is asserted and can be cleared when the `RESET` input is asserted.
Once the latch is set, it will remain set regardless of any future activity on the `SET`
input.  Likewise, it will transition to a low state and remain there regardless of any
future activity.  

### 2.1. API

Beyond its constructor, the `SrLatch` class has the following methods:

#### 2.1.1. `set()`

The `set()` method sets one of the latches two input lines and requires the following values:

* `value` (boolean, required): specifies the value for the input line
* `channel` (number, required): specifies the input channel to set.  This must be one
of the following:
   * 1: specifies that the `S` input of the device should be set
   * 0: specifies that the `R` input of the device should be set

The `set()` method will return an array of two values that should always be the logical
complement of each other.  The first value will be `true` when the device is in a set state
and will be `false` when the device is in a reset state.

#### 2.1.2. `on()`

The `on()` method sets up a handler function for one of the two output channels that will be 
called after an input value has been changed.  This method expects the following parameters:

* `handler` (callback, required): specifies a function that will be called for the given channel.
this function will be passed the following parameters:
  * `value` (boolean): specifies the value for the output channel
  * `channel` (number): specifies the output channel
  * `gate` (SrLatch): specifies the device invoking the callback
* `channel` (number, optional): specifies the output channel to monitor.  if omitted, this
value will default to 0.

#### 2.1.3. `evaluate()`

The `evaluate()` method evaluates the output functions of the internal gates and returns
the results in array of two booleans.  The first of these will be the device state while
the second will be the complement of the device state.

### 2.2. Example

This component is exported from this package as a JavaScript class, `SRLatch`, that can be
connected to other devices or gates.  The following is an example of its usage.

```javascript
const { SrLatch } = require("jhtrauntvein-latches");
const latch = new SrLatch();
let final_state;
latch.on((value) => console.log(`latch value is ${value}`), 0);
console.log("set the latch set input to true");
latch.set(true, 1); // set the latch
console.log("set the latch set input to false");
latch.set(false, 1);
console.log("setting reset to true");
latch.set(true, 0);
console.log("setting reset to false");
final_state = latch.set(false, 0);
console.log(`final state is ${final_state[0]}`);
```

## 3. class `DLatch`

Class `DLatch` is a component that emulates a D type latch.  This device has two inputs, a data line
and an enable line and its current state will reflect the value of the data line whenever the enable
line is asserted.  The `DLatch` uses an `SrLatch` object internally to maintain its state.

### 3.1. API

#### 3.1.1. `set_d()` Sets the Data Line

This function sets the value of the data input and requires the following parameters:

* `value` (boolean, required): specifies the value to be set for the enable line

This function will return  an array of two booleans that represent the state of the internal `SrLatch` after
the data line has been set.  Calling this function is the equivalent of calling `set(value, 0)`.

#### 3.1.2. `set_enable()` Sets the Enable Line

This function sets the value of the enable line which, when asserted, will cause the device to latch
the value of the data input and requires the following parameters:

* `value` (boolean, required): specifies the state to set for the enable line.

This function will return an array of two booleans that represent the state of the internal `SrLatch` after
the enable line has been set.  Calling this function is the equivalent of calling `set(value, 1)`.

#### 3.1.3. `on()` Add A Monitor Function

This function registers a callback that will be called after one of the inputs have been set.  It supports
the following parameters:

* `handler` (callback, required): specifies a function that will be called for the given channel.
this function will be passed the following parameters:
  * `value` (boolean): specifies the value for the output channel
  * `channel` (number): specifies the output channel
  * `gate` (SrLatch): specifies the device invoking the callback
* `channel` (number, optional): specifies the output channel to monitor.  if omitted, this
value will default to 0.

#### 3.1.4. `set()` Set an Input Line

This function sets the value of one of the device's input lines and expects the following parameters:

* `value` (boolean, required): specifies the new value for the input line
* `channel` (number, required): specifies the input channel to set.  This must be one of:
  * 0 (data): set the value of the data input
  * 1 (enable): set the value of the enable input

This method will return an array of two booleans that reflect the state of the internal S-R latch after
the input value has been changed.

### 3.2. Example

The following code creates a D latch sets up a monitor function, and then sets the values of its inputs

```javascript
const { DLatch } = require("jhtrauntvein-latches");
const latch = new DLatch();
let final;

latch.on((value) => console.log(`latch value is ${value}`));
console.log("setting data to true");
latch.set_d(true);
console.log("setting enable to true");
latch.set_enable(true);
console.log("setting enable to false");
latch.set_enable(false);
console.log("setting data to false");
final = latch.set_d(false);
console.log(`final state is ${final[0]}`);
```
