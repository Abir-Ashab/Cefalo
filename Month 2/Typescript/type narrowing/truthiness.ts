function printName(name?: string) {
    // console.log(name.toUpperCase()); // 
    if (name) {
      // Here, name is narrowed to 'string'
      console.log(name.toUpperCase()); // 
    } else {
      // Here, name is 'undefined'
      console.log(name);
    }
}
printName(); // Output: No name provided