import { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import { observer } from "mobx-react-lite";
import "./App.css";

export type Todo = {
  id: number;
  title: string;
  complete: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const url = "http://localhost:4000/todos/";

  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setTodos(data))
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, [url]);

  const addTodo = (todo: { title: string; complete: boolean }) => {
    const fetchData = () => {
      fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(todo),
      })
        .then((res) => res.json())
        .then((data) => setTodos([...todos, data]))
        .catch((err) => console.log(err.message));
    };
    fetchData();
  };
  const deleteTodo = (id: number) => {
    const fetchData = () => {
      fetch(url + id, {
        method: "DELETE",
      })
        .then(() => {
          setTodos(todos.filter((todo) => todo.id !== id));
        })
        .catch((err) => console.log(err.message));
    };
    fetchData();
  };

  return (
    <>
      <Form addTodo={addTodo} />
      <ul className="App">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default observer(App);
