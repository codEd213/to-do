import { useState } from "react";
import "./App.css";

function App() {
  const [newToDo, setNewToDo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewToDoSubmit = (event) => {
    event.preventDefault();
    // todos.push(newToDo);
    //setTodos and pass in a brand new array containing all current todos plus 1 more.
    //todos is our array, newToDo is what we are putting into inputbox, so to start newToDo is empty
    if (newToDo.length === 0) {
      return;
    }

    const todoItem = {
      text: newToDo,
      complete: false,
    };

    setTodos([...todos, todoItem]);
    setNewToDo("");
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i !== delIdx;
    });
    setTodos(filteredTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (index === i) {
        todo.complete = !todo.complete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", padding: "10px" }}>
      <form
        onSubmit={(event) => {
          handleNewToDoSubmit(event);
        }}
      >
        <input
          onChange={(event) => {
            setNewToDo(event.target.value);
          }}
          type="text"
          value={newToDo}
        />
        <div>
          <button>Add</button>
        </div>
      </form>

      {todos.map((todo, i) => {
        const todoClasses = ["bold"];

        if (todo.complete) {
          todoClasses.push("line-through");
        }

        return (
          <div key={i}>
            <span className={todoClasses.join(" ")}>{todo.text}</span>
            <input
              onChange={(event) => {
                handleToggleComplete(i);
              }}
              checked={todo.complete}
              type="checkbox"
            />
            <button
              onClick={(event) => {
                handleTodoDelete(i);
              }}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
