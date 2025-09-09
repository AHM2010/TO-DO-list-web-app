document.addEventListener("DOMContentLoaded", function () {
  // Get the input field, button and task list
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const addButton = document.getElementById("add-task-btn");

  // load tasks from localStorage
  loadTasks();

  // Function to add the task
  function addtask(taskText, save = false) {
    // create a new task item <li> element
    const taskItem = document.createElement("li");

    // Add the task item class selector to the task list item
    taskItem.classList.add("task-item");

    // create a new <div> element to hold the task text
    const taskTextDiv = document.createElement("div");

    // Set the <div> text content to the task text
    taskTextDiv.textContent = taskText;

    // Append the task text <div> to the task item <li>
    taskItem.appendChild(taskTextDiv);

    // Create a new <button> element to remove the task
    const removeButton = document.createElement("button");

    // Set the <button> text content to the "x"
    removeButton.textContent = "x";

    // Add the remove button class selector to the button
    removeButton.classList.add("remove-task-btn");

    // Append the remove button to the task item <li>
    taskItem.appendChild(removeButton);

    // Append the task item <li> to the task list <ul>
    taskList.appendChild(taskItem);

    if (save) {
      // Save task to the local storage
      saveTaskToLocalStorage(taskText);
    }
  }
  // add event listener to the add button
  addButton.addEventListener("click", function () {
    // Get the task
    const taskText = taskInput.value.trim();

    // If the task is empty, return
    if (taskText) {
      // Empty the input field
      taskInput.value = "";
      addtask(taskText, true);
    }
  });

  // Add event listiner to the task list
  taskList.addEventListener("click", (event) => {
    // If the clicked element has the remove-task-btn class, then remove the task
    if (event.target.classList.contains("remove-task-btn")) {
      event.target.parentElement.remove();
      removeTaskFromLocalStorage(
        event.target.previousElementSibling.textContent
      );
    } else if (event.target.classList.contains("task-item")) {
      // Toggle the completed class on the task item
      event.target.classList.toggle("completed");
      event.target.children[0].classList.toggle("completed-task-txt");
      updateTaskInLocalStorage(
        event.target.children[0].textContent,
        event.target.classList.contains("completed")
      );
    } else if (event.target.parentElement.classList.contains("task-item")) {
      // Toggle the completed class on the task item
      event.target.parentElement.classList.toggle("completed");
      event.target.parentElement.children[0].classList.toggle(
        "completed-task-txt"
      );
      updateTaskInLocalStorage(
        event.target.parentElement.children[0].textContent,
        event.target.parentElement.classList.contains("completed")
      );
    }
  });
  function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addtask(task.text);
      if (task.completed) {
        // Mark the task as completed
        const lastAddedTask = taskList.lastElementChild;
        lastAddedTask.classList.add("completed");
        lastAddedTask.children[0].classList.add("completed-task-txt");
      }
    });
  }

  function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateTaskInLocalStorage(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((task) => task.text === taskText);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = isCompleted;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
