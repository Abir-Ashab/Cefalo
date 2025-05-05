// type predicate separates checking logic from your main function, which makes the code cleaner and reusable.
// It ret
function isString(value) {
    return typeof value === 'string';
}
function main(x) {
    if (isString(x)) {
        x.toUpperCase();
        console.log(x)    
    }
    else {
        console.log(x);
    }
}
main("hello"); // Output: HELLO
