const person:{
    name:string;
    age:number;
    hobbies:string[];
    role:[number,string]
}= {
    name :'chamara',
    age:12,
    hobbies:['sports','cooking'],
    role:[2,'author'],
}
//this is not allowed

// person.role[0] = 'sfsdf';
// person.role[2] = 'sfsdf';

// this is allowed

person.role[1] = 'sfsdf';
person.role.push("ksgdfkgsdf");

let favouriteSports:string[];
favouriteSports=['Sports']

console.log(person.age);
console.log(person.name);

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase())
}
