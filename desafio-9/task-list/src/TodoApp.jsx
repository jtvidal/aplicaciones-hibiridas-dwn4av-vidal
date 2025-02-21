import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import TodoList from "./components/TodoList.jsx";
import Form from "./components/Form.jsx";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  function updateTasks(t) {
    setTasks(tasks.push(t));
  }

  return (
    <>
      <Header />
      <main className="flex flex-col gap-4 w-full items-center">
        <Form />
        <TodoList list={tasks} />
      </main>
      <Footer />
    </>
  );
}

export default TodoApp;
