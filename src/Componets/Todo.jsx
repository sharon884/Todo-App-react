import React from "react";
import "../Componets/Todo.css";
import { useState, useRef, useEffect } from "react";

function Todo() {
  const [Tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [Tasks,editIndex]);

  function handleAdd() {
    if (input.trim() == "") {
      alert("Tasks cannot be empty!");
      return;
    }
    setTasks((prev) => ([...prev, {text:input,completed:false}]));
    setInput("");
  }
  function handleDelete(index) {
    const confirmDelete = window.confirm(
      "Are you sure want to delete this task?"
    );
    if (confirmDelete) {
      const withoutDelete = Tasks.filter((task, i) => i != index);
      setTasks(withoutDelete);
    }
  }
  function handleEdit (index) {
    setEditIndex(index);//here index storing the edit index;
    setInput(Tasks[index]);//here showing the editing value in input field;
    
  }
  function handleSave () {
    const updatedTasks = [...Tasks];
   updatedTasks[editIndex]=input;
    setTasks(updatedTasks);
    setInput("");
    setEditIndex(null);
  }
  function handleUp (index) {
    if (index===0){
      alert(" up is not possible !");
      return ;
    }
    const newTasks = [...Tasks];
    let temp = newTasks[index];
    newTasks[index]=newTasks[index-1];
     newTasks[index-1] = temp;
    setTasks(newTasks)

  }
  function handleDown (index) {
    // if (index==Tasks.length-1){
    //   alert("down is not possible!")
    //   return;
    // }
    const DownTasks = [...Tasks];
    let temp = DownTasks[index];
    DownTasks[index]=DownTasks[index+1];
    DownTasks[index+1]=temp;
    setTasks(DownTasks);
  }
  function handleCheck (index) {
   const updatedTasks = Tasks.map((task,i)=>
    i===index?{...task,completed:!task.completed}:task
   );
   setTasks(updatedTasks);
  }
  return (
    <div className="body-todo">
      <h1>To-Do List</h1>
      <div>
        <input
          name="task"
          type="text"
          value={input}
          ref={inputRef}
          placeholder="Enter New Task To Do"
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={editIndex !==null ?handleSave:handleAdd}>{editIndex !==null ?"Save":"Add"}</button>
      </div>
      <div>
        <ol>
          {Tasks.map((task, index) => (
            <li key={index} style={{textDecoration:task.completed?"line-through":"none"}}>
              <input type="checkbox" checked={task.completed} onChange={()=>handleCheck(index)} />
              <div style={{ flex: 1, overflowWrap: "break-word" }}>{task.text}</div>
              <div className="li-buttons">
                <button onClick={()=>handleUp(index)}>up</button>
                <button onClick={()=>handleDown(index)}>down</button>
                <button onClick={() => handleDelete(index)}>delete</button>
                <button onClick={()=>handleEdit(index)} disabled={editIndex!=null}>Edit</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Todo;
