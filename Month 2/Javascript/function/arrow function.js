function Person() {
  // The Person() constructor defines `this` as itself.
  this.age = 0;

  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this`as the global object, which is different from the `this`defined by the Person() constructor.
    this.age++;
    console.log(this.age); // NaN as `this` is not defined in the context of Person()
  }, 1000);
}

{
  function Person() {
    this.age = 0;

    setInterval(() => {
      this.age++; // `this` properly refers to the person object
      console.log(this.age); // 1, 2, 3, 4, ... (increments every second) as `this` is defined in the context of Person()
    }, 1000);
  }
  const p = new Person();
}
