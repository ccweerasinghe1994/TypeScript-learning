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
