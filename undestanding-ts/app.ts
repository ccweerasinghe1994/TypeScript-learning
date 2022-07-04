const person= {
    name :'chamara',
    age:12,
    hobbies:['sports','cooking']
}

let favouriteSports:string[];
favouriteSports=['Sports']

console.log(person.age);
console.log(person.name);

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase())
}
