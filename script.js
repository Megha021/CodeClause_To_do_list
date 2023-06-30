// add a new task
function addTask() {
    var taskInput = document.getElementById("task-input");
    var taskList = document.getElementById("task-list");
    if (taskInput.value === "") {
        return;
    }
    var taskName = taskInput.value;
    taskInput.value = "";
    var taskItem = document.createElement("li");
    taskItem.className = "task-item";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            taskNameElem.style.textDecoration = "line-through";
        } else {
            taskNameElem.style.textDecoration = "none";
        }
        updateTasks();
    });

    var taskNameElem = document.createElement("span");
    taskNameElem.className = "task-name";
    taskNameElem.textContent = taskName;

    var deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(taskItem);
        updateTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskNameElem);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
    updateTasks();
}

function updateTasks() {
    var taskList = document.getElementById("task-list");
    var tasks = [];

    for (var i = 0; i < taskList.children.length; i++) {
        var taskItem = taskList.children[i];
        var taskNameElem = taskItem.querySelector(".task-name");
        var taskName = taskNameElem.textContent;
        var isChecked = taskItem.querySelector("input[type='checkbox']").checked;

        tasks.push({
            name: taskName,
            checked: isChecked
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById("task-list");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        var taskItem = document.createElement("li");
        taskItem.className = "task-item";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.checked;
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                taskNameElem.style.textDecoration = "line-through";
            } else {
                taskNameElem.style.textDecoration = "none";
            }
        updateTasks();
        });

        var taskNameElem = document.createElement("span");
        taskNameElem.className = "task-name";
        taskNameElem.textContent = task.name;

        var deleteBtn = document.createElement("span");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            taskList.removeChild(taskItem);
            updateTasks();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskNameElem);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    }
}

var taskInput = document.getElementById("task-input");
taskInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

window.addEventListener("load", loadTasks);

var resetBtn = document.getElementById("reset-b");
resetBtn.addEventListener("click", function() {
    localStorage.removeItem("tasks");
    location.reload();
});
