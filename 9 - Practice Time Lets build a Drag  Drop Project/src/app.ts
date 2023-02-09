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
    public state: ProjectStatus
  ) {}
}

type Listener = (items: Project[]) => void;

// project state management
class ProjectState {
  private projects: Project[] = [];
  private listeners: Listener[] = [];

  private static instance: ProjectState;

  private constructor() {}
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

  addLIsteners(listener: Listener) {
    this.listeners.push(listener);
  }
}

const projectState = ProjectState.getInstance();

class ProjectList {
  templateElement: HTMLTemplateElement;
  rootElement: HTMLDivElement;
  element: HTMLElement;
  assignProjects: Project[];
  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    this.rootElement = document.getElementById("app") as HTMLDivElement;
    const importNode = document.importNode(this.templateElement.content, true);
    this.assignProjects = [];
    this.element = importNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    projectState.addLIsteners((projects: Project[]) => {
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
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.rootElement.insertAdjacentElement("beforeend", this.element);
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  rootElement: HTMLDivElement;
  element: HTMLFormElement;
  titleElementInput: HTMLInputElement;
  descriptionElementInput: HTMLInputElement;
  peopleElementInput: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;

    this.rootElement = document.getElementById("app") as HTMLDivElement;
    const importNode = document.importNode(this.templateElement.content, true);

    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
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
    this.attach();
  }

  private attach() {
    this.rootElement.insertAdjacentElement("afterbegin", this.element);
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
      return;
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

  private configure() {
    this.element.addEventListener("submit", this.handleSubmit.bind(this));
  }
}

const project = new ProjectInput();
const newProject = new ProjectList("active");
const doneProject = new ProjectList("finished");
