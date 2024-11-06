import React from "react";
import TodoItem from "./TodoItem.jsx";
import Button from "./Button.jsx";

const TodoList = ({ list }) => {
  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <TodoItem key={index} item={item} />
        ))}
      </ul>
      <Button>
        Add Task
      </Button>
    </div>
  );
};

export default TodoList;
