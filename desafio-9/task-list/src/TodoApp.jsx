import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import TodoList from "../components/TodoList.jsx";

function TodoApp() {
  const [tasks, setTasks] = useState();
  
  return (
    <>
      <Header />
      <main>
        <TodoList list={tasks} />
      </main>
      <Footer />
    </>
  );
}

export default TodoApp;
