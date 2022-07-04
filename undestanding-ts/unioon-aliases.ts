type Combine = number | string;
type versionDescriptor = 'as-number'|'as-string';
function combine(input1: Combine, input2: Combine,resultsConversion:versionDescriptor) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' && resultsConversion === "as-number") {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString()
    }
    return result;
}

console.log(combine(12, 34,'as-number'));
console.log(combine(12, 34,'as-string'));
console.log(combine("chamara", "weerasinghe",'as-string'));