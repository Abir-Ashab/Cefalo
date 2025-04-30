var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 5] = "Down";
    Direction[Direction["Left"] = 6] = "Left";
    Direction[Direction["Right"] = 7] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Left); // 6
console.log(Direction.Right); // 7;
