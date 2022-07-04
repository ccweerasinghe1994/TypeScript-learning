// const person:{
//     name:string;
//     age:number;
//     hobbies:string[];
//     role:[number,string]
// }= {
//     name :'chamara',
//     age:12,
//     hobbies:['sports','cooking'],
//     role:[2,'author'],
// }
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READONLY"] = 1] = "READONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var person = {
    name: 'chamara',
    age: 12,
    hobbies: ['sports', 'cooking'],
    role: Role.AUTHOR
};
//this is not allowed
// person.role[0] = 'sfsdf';
// person.role[2] = 'sfsdf';
// this is allowed
//
// person.role[1] = 'sfsdf';
// person.role.push("ksgdfkgsdf");
var favouriteSports;
favouriteSports = ['Sports'];
console.log(person.age);
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
