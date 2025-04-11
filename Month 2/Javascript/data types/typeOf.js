// Define an array of test values with labels
const testValues = [
    { label: "'John'", value: "John" },
    { label: "'John' + 'Doe'", value: "John" + "Doe" },
    { label: "3.14", value: 3.14 },
    { label: "33 + 66", value: 33 + 66 },
    { label: "NaN", value: NaN },
    { label: "1234n", value: 1234n },
    { label: "true", value: true },
    { label: "false", value: false },
    { label: "[1, 2, 3, 4]", value: [1, 2, 3, 4] },
    { label: "{ name: 'John', age: 34 }", value: { name: "John", age: 34 } },
    { label: "new Date()", value: new Date() },
    { label: "new Set()", value: new Set() },
    { label: "new Map()", value: new Map() },
    { label: "Symbol()", value: Symbol() },
    { label: "function() {}", value: function () {} },
    { label: "typeof x (undeclared)", value: typeof x }, // safe usage
    { label: "null", value: null },
  ];
  
  // Log each label and its type
  testValues.forEach(item => {
    console.log(`${item.label} is of type: ${typeof item.value}`);
  });
  