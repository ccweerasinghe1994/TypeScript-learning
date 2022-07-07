### Using watch mode

this will automatically reload the specified file.
downside is we have to target a specific file.

```shell
🔥 -> tsc your-file-name --watch
```

### let's initiate typescript config

go to your project root and open the terminal there

```shell
🔥 -> tsc --init
```

this will generate the tsconfig.json file.
then to watch for changes.

```shell
🔥 -> tsc -w
```

### including or excluding files

- let's check the tsconfig file.
- these are the default selected options.
- we can exclude files/directories from the project.
- we can use wild card to do that.

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "exclude": [
    "node_modules"
  ]
}

```

### Setting a compilation target

compiler options allow us to control how typescript compile our code.

```json
  "target": "es2016",
```

this target specify which javascript version do u want to compile your typescript code to.

### Understanding typescript core modules.

initially this is empty.
these are the default options.

```json
  "lib": [
"DOM",
"ES6",
"DOM.Iterable",
"ScriptHost",
],  
```

### More configuration options
these will allow js files in the project.

and check errors in the js files.
```json
"allowJs": true,
"checkJs": true, 
```
### Working with source mapping
```json
 "sourceMap": true, 
```
by allowing source maps we can see the input files directly in the browser.

this can be very helpfully when we are debugging the applications.

## Root dir and Out Dir
```json
  "rootDir": "./src",
  "outDir": "./dist",
  "removeComments": true,
  "noEmit": true,
```
these options are input and out put locations.
removing comments.
and show error without compiling.

### Stop Emitting files on compilation error
```json
  "noEmitOnError": true,
```

### strict compilation
```json
 "strict": true, 
  
```
or make above option false and change these options one by one
```json
"noImplicitAny": false,
```
example
```ts
let variable;
function analytics(data){
    console.log(data);
    variable ='sdsds';
}

analytics("the data to");
```
this will throw and error.

```json
"strictNullChecks": true,
```
example
```ts

const button = document.querySelector('button');

button.addEventListener('click',()=>{
    console.log("clicked")
})
```
these will throw and error

workaround would be
```ts
const button = document.querySelector('button');

if (button){
    button.addEventListener('click', () => {
        console.log("clicked")
    })
} 

```
let's look at this option.
```json
"strictBindCallApply": true,
```
```ts
const button = document.querySelector('button');

function handleClick(message:string){
    console.log("clicked"+message)
}

if (button) {
    button.addEventListener('click', handleClick.bind(null,"abc"));
}

```
### Code quality options.
```json
  "noUnusedLocals": true,                          
    "noUnusedParameters": true,
    "noImplicitReturns": true, 
```
examples
```ts
function add(num:number,num2:number){
    if(num>num2){
        return num+num2
    }
}

function handleClick(message:string,age:number){
    const abc = 'sdssdsd';
    console.log("clicked"+message)
}

```
### debugging with visual studio code
