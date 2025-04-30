enum Direction {
    Up = 1,
    Down = 5,
    Left,
    Right
}

console.log(Direction.Left)   // 6
console.log(Direction.Right)  // 7
console.log(Direction[1]) // Up ;


{
    enum Direction {
        Up = "Up",
        Down = "Down",
        // Left
        // Right
    }
    // If I comment out Left and Right, the enum will be incomplete and show error before runtime. Because it is not a number, so it is not auto-incremented. If we want to keep the rest blank, we need to assign a value to the last one.
    {
        enum Direction {
            Up = "Up",
            Down = "Down",
            Left = 1,
            Right
        }
        // This works fine, because we have assigned a value to Left. Right will be auto-incremented to 2.
    }
}

{
    enum Direction {
        Up = "Up",
        Down = "Down",
        Left = 1,
        Right
    }
}

// You cannot use:

// Objects
// Arrays
// Booleans
// Functions
// Symbols