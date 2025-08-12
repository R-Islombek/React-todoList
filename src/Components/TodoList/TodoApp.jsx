import React, { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([newTodo, ...todos]);
    setText("");
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-container">
      <h1>📝 Mening Vazifalarim</h1>

      <form onSubmit={handleAdd} className="todo-input">
        <input
          type="text"
          placeholder="Yangi vazifa qo'shish..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <button type="submit">Qo'shish</button>
      </form>

      <div className="todo-stats">
        <span>{activeCount} ta aktiv vazifa</span>
        <button onClick={clearCompleted} className="clear-btn">
          Tozalash
        </button>
      </div>

      <div className="todo-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Hammasi
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Faol
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Bajarilgan
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-state">Vazifalar topilmadi</li>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? "completed" : ""}
            >
              <span onClick={() => handleToggle(todo.id)}>
                {todo.text}
                <span className="todo-date">
                  {new Date(todo.createdAt).toLocaleString()}
                </span>
              </span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
                aria-label="O'chirish"
              >
                X
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoApp;