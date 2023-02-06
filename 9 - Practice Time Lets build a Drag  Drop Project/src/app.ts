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
    const peopleElement = this.peopleElementInput.value;
    console.table([
      titleElement.trim().length,
      descriptionElement.trim().length,
      peopleElement.trim().length,
    ]);

    if (
      titleElement.trim().length === 0 ||
      descriptionElement.trim().length === 0 ||
      peopleElement.trim().length === 0
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
      console.log(title);
      console.log(description);
      console.log(people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.handleSubmit.bind(this));
  }
}

const project = new ProjectInput();
