/// <reference path="./model/drag-and-drop.interfaces.ts" />
/// <reference path="./model/drag-and-drop.interfaces.ts" />
/// <reference path="./state/project-state.ts" />
/// <reference path="./utils/validation.ts" />
/// <reference path="./decorators/auto-bind-decorators.ts" />
/// <reference path="./components/base.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-input.ts" />

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
