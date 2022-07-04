var person = {
    name: 'chamara',
    age: 12,
    hobbies: ['sports', 'cooking']
};
var favouriteSports;
favouriteSports = ['Sports'];
console.log(person.age);
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
