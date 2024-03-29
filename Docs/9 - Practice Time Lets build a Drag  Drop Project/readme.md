2 - Getting Started
setup the app
3 - DOM Element Selection OOP Rendering

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>ProjectManager</title>
    <link rel="stylesheet" href="./app.css"/>
    <script src="./dist/app.js" defer></script>
</head>
<body>
<template id="project-input">
    <form>
        <div class="form-control">
            <label for="title">Title</label>
            <input type="text" id="title"/>
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <textarea id="description" rows="3"></textarea>
        </div>
        <div class="form-control">
            <label for="people">People</label>
            <input type="number" id="people" step="1" min="0" max="10"/>
        </div>
        <button type="submit">ADD PROJECT</button>
    </form>
</template>
<template id="single-project">
    <li></li>
</template>
<template id="project-list">
    <section class="projects">
        <header>
            <h2></h2>
        </header>
        <ul></ul>
    </section>
</template>
<div id="app"></div>
</body>
</html>
```

```ts
class ProjectInput {
    templateElement: HTMLTemplateElement;
    rootElement: HTMLDivElement;
    element: HTMLFormElement;

    constructor() {
        this.templateElement = document.getElementById(
            "project-input"
        ) as HTMLTemplateElement;

        this.rootElement = document.getElementById("app") as HTMLDivElement;
        const importNode = document.importNode(this.templateElement.content, true);

        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";
        this.attach();
    }

    private attach() {
        this.rootElement.insertAdjacentElement("afterbegin", this.element);
    }
}

const project = new ProjectInput();
```

**output**

![](../img/18.png)
4 - Interacting with DOM Elements

```ts
this.element = importNode.firstElementChild as HTMLFormElement;
this.element.id = "user-input";
this.attach();
```

5 - Creating Using an Autobind Decorator

```ts
function AutoBind(_target: any, _name: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const _modifiedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const bindFunction = originalMethod.bind(this);
            return bindFunction;
        },
    };

    return _modifiedDescriptor as TypedPropertyDescriptor<() => void>;
}


//   @AutoBind
private
handleSubmit(event
:
Event
)
{
    event.preventDefault();
    console.log(this.titleElementInput.value);
}

```

6 - Fetching User Input

7 - Creating a Re-Usable Validation Functionality

```ts
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validateInput: Validatable) {
    let isValid = true;

    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length > 0;
    }

    if (
        validateInput.maxLength != null &&
        typeof validateInput.value === "string"
    ) {
        isValid =
            isValid &&
            validateInput.value.toString().trim().length <= validateInput.maxLength;
    }

    if (
        validateInput.minLength != null &&
        typeof validateInput.value === "string"
    ) {
        isValid =
            isValid &&
            validateInput.value.toString().trim().length >= validateInput.minLength;
    }
    if (validateInput.min != null && typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value >= validateInput.min;
    }
    if (validateInput.max != null && typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value <= validateInput.max;
    }

    return isValid;
}

const titleValidatable: Validatable = {
    value: titleElement,
    required: true,
};
const descriptionValidatable: Validatable = {
    value: descriptionElement,
    required: true,
    minLength: 5,
};
const peopleValidatable: Validatable = {
    value: peopleElement,
    required: true,
    min: 1,
    max: 5,
};
const peopleValidatable: Validatable = {
    value: peopleElement,
    required: true,
    min: 1,
    max: 5,
};
if (
    !validate(titleValidatable) ||
    !validate(descriptionValidatable) ||
    !validate(peopleValidatable)
) {
    alert("Invalid Input please try again!");
    return;
} else {
    return [titleElement, descriptionElement, +peopleElement];
}
}
```

```ts

```

8 - Rendering Project Lists

```ts

```

9 - Managing Application State with Singletons

```ts
class ProjectState {
    private projects: any[] = [];
    private listeners: any[] = [];

    private static instance: ProjectState;

    private constructor() {
    }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people: numberOfPeople,
        };

        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }

    addLIsteners(listener: Function) {
        this.listeners.push(listener);
    }
}

const projectState = ProjectState.getInstance();


class ProjectList {
    templateElement: HTMLTemplateElement;
    rootElement: HTMLDivElement;
    element: HTMLElement;
    assignProjects: any[];

    constructor(private type: "active" | "finished") {
        this.templateElement = document.getElementById(
            "project-list"
        ) as HTMLTemplateElement;
        this.rootElement = document.getElementById("app") as HTMLDivElement;
        const importNode = document.importNode(this.templateElement.content, true);
        this.assignProjects = [];
        this.element = importNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addLIsteners((projects: any[]) => {
            this.assignProjects = projects;
            this.renderProject();
        });

        this.attach();
        this.renderContent();
    }

    private renderProject() {
        const ulElement = document.getElementById(
            `${this.type}-projects-list`
        ) as HTMLUListElement;
        for (const prjItem of this.assignProjects) {
            const li = document.createElement("li");
            li.textContent = prjItem.title;
            ulElement.appendChild(li);
        }
    }

...
```

10 - More Classes Custom Types

```ts
enum ProjectStatus {
    Active,
    Finished,
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public state: ProjectStatus
    ) {
    }
}

// and using it on
addProject(title
:
string, description
:
string, numberOfPeople
:
number
)
{
    const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numberOfPeople,
        ProjectStatus.Active
    );

    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
    }
}

// and using it on 
class ProjectList {
    templateElement: HTMLTemplateElement;
    rootElement: HTMLDivElement;
    element: HTMLElement;
    assignProjects: Project[];
.........


// adding listener type

    type
    Listener = (items: Project[]) => void;

// project state management
    class
    ProjectState {
    private projects: Project[] = [];
    // and using it here
    private listeners: Listener[] = [];
....

// and using it on the projectState class as well

    addLIsteners(listener: Listener) {
        this.listeners.push(listener);
    }

// in the projectList class as well 
    projectState
.

    addLIsteners(

(
    projects: Project[]
) => {
    this
.
    assignProjects = projects;
    this
.

    renderProject();
}

)
;

```

11 - Filtering Projects with Enums
let's add the filter method

```ts
    projectState.addLIsteners((projects: Project[]) => {
    const relevantProjects = projects.filter((project) => {
        if (this.type === "active") {
            return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
    });
    this.assignProjects = relevantProjects;
    this.renderProject();
});
```

to remove the code duplication

```ts
function AutoBind(_target: any, _name: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const _modifiedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const bindFunction = originalMethod.bind(this);
            return bindFunction;
        },
    };

    return _modifiedDescriptor as TypedPropertyDescriptor<() => void>;
}

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validateInput: Validatable) {
    let isValid = true;

    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length > 0;
    }

    if (
        validateInput.maxLength != null &&
        typeof validateInput.value === "string"
    ) {
        isValid =
            isValid &&
            validateInput.value.toString().trim().length <= validateInput.maxLength;
    }

    if (
        validateInput.minLength != null &&
        typeof validateInput.value === "string"
    ) {
        isValid =
            isValid &&
            validateInput.value.toString().trim().length >= validateInput.minLength;
    }
    if (validateInput.min != null && typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value >= validateInput.min;
    }
    if (validateInput.max != null && typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value <= validateInput.max;
    }

    return isValid;
}

enum ProjectStatus {
    Active,
    Finished,
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {
    }
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListeners(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

// project state management
class ProjectState extends State<Project> {
    private projects: Project[] = [];


    private static instance: ProjectState;

    private constructor() {
        super();
    }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numberOfPeople,
            ProjectStatus.Active
        );

        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }

}

const projectState = ProjectState.getInstance();

// Component base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    protected constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(
            templateId
        ) as HTMLTemplateElement;

        this.hostElement = document.getElementById(hostElementId) as T;

        const importNode = document.importNode(this.templateElement.content, true);

        this.element = importNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtBegin: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBegin ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;

    abstract renderContent?(): void
}

// project list class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {

    assignProjects: Project[];

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`);
        const importNode = document.importNode(this.templateElement.content, true);
        this.assignProjects = [];
        this.element = importNode.firstElementChild as HTMLElement;

        this.configure();
        this.renderContent();
    }

    override configure() {
        projectState.addListeners((projects: Project[]) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === "active") {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignProjects = relevantProjects;
            this.renderProject();
        });
    }

    override renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent =
            this.type.toUpperCase() + " PROJECTS";
    }

    private renderProject() {
        const ulElement = document.getElementById(
            `${this.type}-projects-list`
        ) as HTMLUListElement;

        ulElement.innerHTML = "";
        for (const prjItem of this.assignProjects) {
            const li = document.createElement("li");
            li.textContent = prjItem.title;
            ulElement.appendChild(li);
        }
    }

}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

    titleElementInput: HTMLInputElement;
    descriptionElementInput: HTMLInputElement;
    peopleElementInput: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input")

        this.titleElementInput = this.element.querySelector(
            "#title"
        ) as HTMLInputElement;
        this.descriptionElementInput = this.element.querySelector(
            "#description"
        ) as HTMLInputElement;
        this.peopleElementInput = this.element.querySelector(
            "#people"
        ) as HTMLInputElement;
        this.configure();
    }

    override configure() {
        this.element.addEventListener("submit", this.handleSubmit.bind(this));
    }

    override renderContent() {
    }

    private gatherUserInput(): [string, string, number] | void {
        const titleElement = this.titleElementInput.value;
        const descriptionElement = this.descriptionElementInput.value;
        const peopleElement = +this.peopleElementInput.value;

        const titleValidatable: Validatable = {
            value: titleElement,
            required: true,
        };
        const descriptionValidatable: Validatable = {
            value: descriptionElement,
            required: true,
            minLength: 5,
        };
        const peopleValidatable: Validatable = {
            value: peopleElement,
            required: true,
            min: 1,
            max: 5,
        };
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert("Invalid Input please try again!");
        } else {
            return [titleElement, descriptionElement, +peopleElement];
        }
    }

    private clearInputs() {
        this.descriptionElementInput.value = "";
        this.peopleElementInput.value = "";
        this.titleElementInput.value = "";
    }

    //   @AutoBind
    private handleSubmit(event: Event) {
        event.preventDefault();
        console.log(this.titleElementInput.value);
        const userInputs = this.gatherUserInput();
        if (Array.isArray(userInputs)) {
            const [title, description, people] = userInputs;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }


}

const project = new ProjectInput();
const newProject = new ProjectList("active");
const doneProject = new ProjectList("finished");

```

13 - Rendering Project Items with a Class

```ts

```

14 - Using a Getter

```ts

```

15 - Utilizing Interfaces to Implement Drag Drop

```ts

```

16 - Drag Events Reflecting the Current State in the UI

```ts

```

17 - Adding a Droppable Area

```ts

```

18 - Finishing Drag Drop

```ts

```

19 - Wrap Up
