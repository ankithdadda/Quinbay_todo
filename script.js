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

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks');
      const tasks = await response.json();
      tasks.forEach(task => renderTask(task));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const renderTask = (task) => {
    const todoCard = document.createElement("div");
    todoCard.className = "todo-card";
    todoCard.dataset.id = task.id;

    const todoTextSpan = document.createElement("span");
    todoTextSpan.className = "todo-text";
    todoTextSpan.textContent = task.name;

    if (task.completed) {
      todoTextSpan.classList.add("completed");
      completedCount++;
    }

    const todoActions = document.createElement("div");
    todoActions.className = "todo-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      updateTaskStatus(task.id, task.completed);
      todoTextSpan.classList.toggle("completed");
      completedCount += task.completed ? 1 : -1;
      updateCounters();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
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
  };

  const addTodo = async () => {
    const text = todoText.value.trim();
    if (!text) return alert("Please enter a task:");

    const newTask = { name: text, completed: false };
    
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      
      if (response.ok) {
        const task = await response.json();
        renderTask(task);
      } else {
        alert("Error adding task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }

    todoText.value = "";
  };

  const updateTaskStatus = async (taskId, completed) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}/complete`, {  // Updated URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        alert("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  addBtn.addEventListener("click", addTodo);
  todoText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  fetchTasks(); // Load tasks when the page is ready
});
