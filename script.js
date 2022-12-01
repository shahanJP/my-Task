//const form = document.querySelector("#form");
const inputValue = document.getElementById("InputValue");
const assignValue = document.getElementById("assignValue");
const statusValue = document.getElementById("statusValue");
const dateValue = document.getElementById("dateValue");
const descValue = document.getElementById("descValue");
const submitBtn = document.getElementById("submitBtn");

//create Bootstrap html//
const createBootstrap = (id, taskName, assign, date, status, desc) => {
  return `   
      <div class="card card-body bg-warning mx-5" data-task-id=${id} >
     <div class="d-flex  mt-2 justify-content-between align-items-center">
         <h5>${taskName}</h5>
         <span class=" ${
           status === "STARTED"
             ? "text-danger"
             : status === "IN-PROGRESS"
             ? "text-primary"
             : status === "REVIEWED"
             ? "text-info"
             : "text-success"
         } fw-bold fs-6">${status}</span>
     </div>
     <div class="d-flex  mb-3 justify-content-between">
         <small>Assigned To: ${assign}</small>
         <small><span class="fw-bold">Due Date:</span> ${date}</small>
      </div>
     <p  ><span class="fw-bold">Description:</span> ${desc}</p>
     <div class="d-flex w-100 justify-content-end btns">
         <button class="btn-background bg-success text-white mx-5 btn btn-outline-success done-button mr-1 ${
           status === "DONE" ? "invisible" : "visible"
         }">Mark As Done</button>
         <button class="btn-background bg-danger text-white mx-5 btn btn-outline-danger delete-button">Delete</button>
     </div>
     </div>
`;
};

//Task Constructor Class//
class Task {
  constructor(Id = 0) {
    this.taskArr = [];
    this.Id = Id;
  }
  //add task
  addTask(taskName, assign, date, status, desc) {
    const newTask = {
      id: this.Id++,
      taskName: taskName,
      assign: assign,
      date: date,
      status: status,
      desc: desc,
    };
    this.taskArr.push(newTask);
  }
  //clear field after task submit
  clearFields() {
    inputValue.value = "";
    assignValue.value = "";
    statusValue.value = "";
    descValue.value = "";
    dateValue.value = "";
    submitBtn.value = "";
  }


  //getting task from array 
  getTask(taskId) {
    let getTask;
    for (let i = 0; i < this.taskArr.length; i++) {
      const task = this.taskArr[i];
      if (task.id === taskId) {
        getTask = task;
      }
    }
    return getTask;
  }
//saving to local storage
  saveToLstorage() {
    const taskStingify = JSON.stringify(this.taskArr);
    // console.log(taskStingify);
    localStorage.setItem("task", taskStingify);
    const Id = String(this.Id);
    localStorage.setItem("Id", Id);
  }
  //get data from localstorage  after refresh or browser closed
  getPage() {
    if (localStorage.getItem("task")) {
      const getData = localStorage.getItem("task");
      // console.log(getData);
      this.taskArr = JSON.parse(getData);
      console.log(this.taskArr);
    }
     if (localStorage.getItem("Id")) {
      const Id = localStorage.getItem("Id");
      this.Id = Number(Id);
    }
  }
  // display task card 
  displayPage() {
    const htmlList = [];
    for (let i = 0; i < this.taskArr.length; i++) {
      const tasks = this.taskArr[i];
      const taskHtml = createBootstrap(
        tasks.id,
        tasks.taskName,
        tasks.assign,
        tasks.date,
        tasks.status,
        tasks.desc
      );
      htmlList.push(taskHtml);
    }
    const tasksHtml = htmlList.join("\n");
    const taskList = document.querySelector("#task-card");
    taskList.innerHTML = tasksHtml;
  }
}

//new Task instance
const taskClass = new Task(0);
taskClass.getPage();
taskClass.displayPage();

//event listner for form
submitBtn.addEventListener("click", (event) => {
  //event.preventDefault();
  validateForm();
  if (isFormValid() == true) {
    taskClass.addTask(
      inputValue.value,
      assignValue.value,
      dateValue.value,
      statusValue.value,
      descValue.value
    );
    taskClass.clearFields();
    taskClass.saveToLstorage();
    taskClass.displayPage();
  } else {
    event.preventDefault();
  }
});
/// valid form after all field filled true or false
function isFormValid() {
  const inputContainers = document.querySelectorAll(".input-group");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
}
//Form validation
function validateForm() {
  //Task Name
  if (inputValue.value.trim() === "") {
    setError(inputValue, "*Please Enter Your Name");
  } else {
    setSuccess(inputValue);
  }
  //Assign To
  if (assignValue.value === "") {
    setError(assignValue, "*Please Choose Team Member");
  } else {
    setSuccess(assignValue);
  }
  //Status
  if (statusValue.value === "") {
    setError(statusValue, "*Please Choose Your Status");
  } else {
    setSuccess(statusValue);
  }

  //date
  if (dateValue.value == "") {
    setError(dateValue, "*Please Choose Your Due Date");
  } else {
    setSuccess(dateValue);
  }
  //Description
  if (descValue.value.trim().length < 10 || descValue.value.trim() > 200) {
    setError(
      descValue,
      "*Description Minimum 10 and Maximum 200 characters long"
    );
  } else {
    if (descValue.value.trim().length < 10 || descValue.value.trim() > 200) {
    } else {
      setSuccess(descValue);
    }
  }
}

//setting error and success message
function setError(element, errorMessage) {
  const parent = element.parentElement;
  if (parent.classList.contains("success")) {
    parent.classList.remove("success");
  }
  parent.classList.add("error");
  const paragraph = parent.querySelector("p");
  paragraph.textContent = errorMessage;
}

function setSuccess(element) {
  const parent = element.parentElement;
  if (parent.classList.contains("error")) {
    parent.classList.remove("error");
  }
}
//Toggling Mark as done button
const taskCard = document.querySelector("#task-card");
taskCard.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-button")) {
    const button = event.target;
    const parentTask = button.parentElement.parentElement;
    console.log(parentTask);
    const taskId = Number(parentTask.dataset.taskId);
    const task = taskClass.getTask(taskId);
    task.status = "DONE";
    taskClass.saveToLstorage();
    taskClass.displayPage();
  }
  //Toggling delete button
  if (event.target.classList.contains("delete-button")) {
    const parentTask = event.target.parentElement.parentElement;
    console.log(parentTask);
    const taskId = Number(parentTask.dataset.taskId);
    //console.log(taskId);
    taskClass.saveToLstorage();
    taskClass.displayPage();
  }
});

// function to get all tasks
/*
 const filterStatus = document.getElementById('statusValueFiltered');
let option;
filterStatus.addEventListener("click", function() {
  let sthing = statusValueFiltered.value;
  switch(sthing) {
  case "Started":
    option = "Started";
    break;
  case "In-Progress":
    option = "In-Progress";
    break;
  case "Review":
    option = "Review";
    break;
  case "Finished":
    option = "Finished";
    break;
  case "All-Status":
    option = "All-Status";
    break;
  }
  getTasksWithStatus(this.taskArr, option);
});

*/
