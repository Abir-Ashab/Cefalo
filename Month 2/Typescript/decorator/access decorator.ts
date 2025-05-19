function Configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.configurable = value;
    };
}

class Example {
    private _val: number = 1;

    @Configurable(false)
    get val() {
        return this._val;
    }
}
  