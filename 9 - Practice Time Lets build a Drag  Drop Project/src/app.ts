function AutoBind(){
    
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  rootElement: HTMLDivElement;
  element: HTMLFormElement;
  titleElementInput: HTMLInputElement;
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
    this.configure();
    this.attach();
  }

  private attach() {
    this.rootElement.insertAdjacentElement("afterbegin", this.element);
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    console.log(this.titleElementInput.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.handleSubmit.bind(this));
  }
}

const project = new ProjectInput();
