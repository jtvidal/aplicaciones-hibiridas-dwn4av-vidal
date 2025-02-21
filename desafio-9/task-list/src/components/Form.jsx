import { useState } from "react";
import Button from "./Button.jsx";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex gap-4 w-full">
      <form onSubmit={(e)=>{e.preventDefault()}} className="w-full">
        <div>
          <label htmlFor="task"></label>
          <input
            id="task"
            type="text"
            className="bg-purple-400"
            onChange={(value) => {
              setInputValue(value.target.value);
            }}
          />
        </div>
        <div>
          <Button
            handleClick={() => {
              const v = inputValue
              console.log("tarea almacenada: ", v);
            }}
          >
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
