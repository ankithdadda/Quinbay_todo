document.addEventListener("DOMContentLoaded", () => {
  const todoText = document.getElementById("todo-text");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");
  const completedCounter = document.getElementById("completed-counter");
  const totalCounter = document.getElementById("total-counter");

  let completedCount = 0;
  let totalCount = 0;

  const updateCounters = () => {
    completedCounter.textContent = `Completed: ${completedCount}`;
    totalCounter.textContent = `Total Tasks: ${totalCount}`;
  };

  const addTodo = () => {
    const text = todoText.value.trim();
    if (!text) return alert("Please enter a task:");

    const todoCard = document.createElement("div");
    todoCard.className = "todo-card";

    const todoTextSpan = document.createElement("span");
    todoTextSpan.className = "todo-text";
    todoTextSpan.textContent = text;

    const todoActions = document.createElement("div");
    todoActions.className = "todo-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => {
      todoTextSpan.classList.toggle("completed");
      completedCount += todoTextSpan.classList.contains("completed") ? 1 : -1;
      updateCounters();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", () => {
      if (todoTextSpan.classList.contains("completed")) completedCount--;
      todoList.removeChild(todoCard);
      totalCount--;
      updateCounters();
    });

    todoActions.appendChild(completeBtn);
    todoActions.appendChild(deleteBtn);

    todoCard.appendChild(todoTextSpan);
    todoCard.appendChild(todoActions);

    todoList.appendChild(todoCard);

    totalCount++;
    updateCounters();
    todoText.value = "";
  };

  addBtn.addEventListener("click", addTodo);
  todoText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });
});
