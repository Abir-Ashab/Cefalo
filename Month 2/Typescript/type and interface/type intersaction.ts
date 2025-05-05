// we get the inheritence feature of typescript by using the intersection operator '&' using "type" keyword
type Person = {
    name: string;
    age: number;
}

type Employee = Person & {
    employeeId: number;
}
type Manager = Employee & {
    department: string;
}
type ManagerDetails = Manager & {
    managerId: number;
}