import { useState } from "react";
import Input from "./Input";

export default function NewTask({ onAddTask }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }
    
    onAddTask(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        className="w-64 p-1 border-b-2 bg-stone-200 rounded-sm border-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        onChange={handleChange}
        value={enteredTask}
      />
      <button onClick={handleClick}>Add Task</button>
    </div>
  );
}
