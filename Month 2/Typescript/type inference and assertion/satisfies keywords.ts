{
    // Each property can be a string or an RGB tuple.
    const palette = {
        red: [255, 0, 0],
        green: "#00ff00",
        bleu: [0, 0, 255] // ~~~~ The typo is not detected, we can detect it using type annotation
    };
    const greenNormalized = palette.green.toUpperCase();
    console.log(greenNormalized); // "#00FF00"
}


{
    // Notice that we’ve written bleu, whereas we probably should have written blue. 
    type Colors = "red" | "green" | "blue";
    type RGB = [red: number, green: number, blue: number];
    const palette: Record<Colors, string | RGB> = {
        red: [255, 0, 0],
        green: "#00ff00",
        blue: [0, 0, 255] // ~~~~ The typo is now correctly detected by the type annotation.
    };
    // But we now have an undesirable error here - 'palette.green' "could" be of type RGB and property 'toUpperCase' does not exist on type 'string | RGB'. RGB does not have a toUpperCase() method.
    const greenNormalized = palette.green.toUpperCase();
}


{
    type Colors = "red" | "green" | "blue";
    type RGB = [red: number, green: number, blue: number];
    const palette = {
        red: [255, 0, 0],
        green: "#00ff00",
        bleu: [0, 0, 255]
    //  ~~~~ The typo is now caught!
    } satisfies Record<Colors, string | RGB>;
    // toUpperCase() method is accessible! Because it preserves the precise inferred types(whether it is string or not) of each property.
    const greenNormalized = palette.green.toUpperCase(); 
}

