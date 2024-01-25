let toDoTaskInput = document.getElementById("todo-task__input");
let toDoTaskAdd = document.getElementById("todo-task__add");
let todoTaskMain = document.getElementById("todo-task__main");
let statusMenu = document.querySelectorAll("#todo-status div>a");
let underLine = document.getElementById("under-line");

toDoTaskAdd.addEventListener("click", addTask);
toDoTaskAdd.addEventListener("keydown", handleKeyPress);
// toDoTaskAdd.setAttribute("tabindex", "0");

console.log(toDoTaskAdd);
let list = [];
let mode = "all";
let taskList = [];
let filterList = [];

function handleKeyPress(event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.key === "Enter") {
    addTask();
  }
}

function addTask() {
  let task = {
    id: uniqueID(),
    taskContent: `${toDoTaskInput.value}`,
    isCompleted: false,
  };

  console.log("task :", task);
  taskList.push(task);
  filter(mode);
}

//taskList 와 filterList로 나눠서 랜더링
//filterList는 진행중과 완료 리스트
// 진행중은 isCompleted = false,완료는 isCompleted = true
for (let i = 0; i < statusMenu.length; i++) {
  statusMenu[i].addEventListener("click", (event) => {
    mode = event.target.id;

    filter(mode);
    todoUnderline(event);
  });
}

function todoUnderline(event) {
  underLine.style.left = event.currentTarget.offsetLeft + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";
  underLine.style.top =
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
}

function filter(_mode) {
  console.log(_mode);
  filterList = [];
  if (_mode === "all") {
    render();
  } else if (_mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isCompleted == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (_mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isCompleted) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function render() {
  let todoHTML = "";
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isCompleted === false) {
      todoHTML += `<div class="todo-task__main-task">
          <div id=${list[i].id}>${list[i].taskContent}</div>
              <div id="todo-task__button">
            <button id=${list[i].id} class="todo-task__completed" onClick=completeTask(event)><i class="fa-regular fa-circle-check fa-2x"></i></button>
            <button id=${list[i].id} class="todo-task__delete" onClick=deleteTask(event)><i class="fa-regular fa-circle-xmark fa-2x"></i></button>
              </div>
      </div>`;
    } else {
      todoHTML += `<div class="todo-task__main-task">
          <div  id=${list[i].id} class="todo-task__complete">${list[i].taskContent}</div>
              <div id="todo-task__button">
            <button id=${list[i].id} class="todo-task__completed" onClick=completeTask(event)><i class="fa-regular fa-circle-check fa-2x"></i></button>
            <button id=${list[i].id} class="todo-task__delete" onClick=deleteTask(event)><i class="fa-regular fa-circle-xmark fa-2x"></i></button>
              </div>
      </div>`;
    }
  }
  todoTaskMain.innerHTML = todoHTML;
}
//using toggle make a cross line when i push the button

function deleteTask(event) {
  _id = event.target.id;
  for (let i = 0; i < taskList.length; i++) {
    if (_id == taskList[i].id) {
      const index = taskList.indexOf(taskList[i]);
      if (index > -1) {
        // only splice array when item is found
        taskList.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  }
  filter(mode);
}

function completeTask(event) {
  let taskCompleteId = event.target.id;

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == taskCompleteId) {
      taskList[i].isCompleted = !taskList[i].isCompleted;
      break;
    }
  }
  render();
}

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}
