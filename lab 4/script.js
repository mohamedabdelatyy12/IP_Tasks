class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    this.list = document.getElementById("taskList");
    this.input = document.getElementById("taskInput");

    this.render();

    this.events();
  }

  events() {
    document.getElementById("addBtn").addEventListener("click", () => this.addTask());

    document.querySelectorAll(".filters button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.filterTasks(e.target.dataset.filter);
      });
    });

    document.getElementById("sortAlpha").addEventListener("click", () => this.sortAlpha());

    document.getElementById("sortTime").addEventListener("click", () => this.sortTime());
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask() {
    let text = this.input.value.trim();

    if (!text) return;

    let task = {
      id: Date.now(),
      text: text,
      completed: false,
      created: new Date().toLocaleString(),
    };

    this.tasks.push(task);

    this.input.value = "";

    this.save();

    this.render();
  }

  toggle(id) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    this.save();
    this.render();
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    this.save();
    this.render();
  }

  edit(id) {
    let newText = prompt("Edit task");

    if (!newText) return;

    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        task.text = newText;
      }
      return task;
    });

    this.save();
    this.render();
  }

  filterTasks(type) {
    if (type === "completed") {
      this.render(this.tasks.filter((t) => t.completed));
    } else if (type === "incomplete") {
      this.render(this.tasks.filter((t) => !t.completed));
    } else {
      this.render(this.tasks);
    }
  }

  sortAlpha() {
    this.tasks.sort((a, b) => a.text.localeCompare(b.text));

    this.render();
  }

  sortTime() {
    this.tasks.sort((a, b) => a.id - b.id);

    this.render();
  }

  render(tasks = this.tasks) {
    this.list.innerHTML = "";

    tasks.forEach((task) => {
      let li = document.createElement("li");

      li.className = "task";

      if (task.completed) li.classList.add("completed");

      li.innerHTML = `

<div>

<strong>${task.text}</strong>

<br>

<small>${task.created}</small>

</div>

<div class="icons">

<i class="fa fa-check check"></i>
<i class="fa fa-edit edit"></i>
<i class="fa fa-trash delete"></i>

</div>

`;

      li.querySelector(".check").onclick = () => this.toggle(task.id);

      li.querySelector(".delete").onclick = () => this.delete(task.id);

      li.querySelector(".edit").onclick = () => this.edit(task.id);

      this.list.appendChild(li);
    });
  }
}

new TaskManager();
