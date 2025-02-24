import React from 'react'
import "../Componets/Todo.css"
import {useState} from "react"

function Todo() {
    const [Tasks,setTasks]=useState([]);
    const [input,setInput]=useState("")
    function handleAdd () {
     if (input.trim() ==" "){
       alert("Tasks cannot be empty!")
     }
    }
  return (
    <div className='body-todo'>
        <h1>To-Do List</h1>
      <form action="">
        <input type='text' value={input} placeholder='Enter New Task To Do' onChange={(event)=>setInput(event.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </form>
      <div>
        <ol>
            <li>

            <input type="checkbox" />
            <div className='li-buttons'>
                <button>up</button>
                <button>down</button>
                <button>delete</button>
                <button>Edit</button>

            </div>
            </li>
        </ol>
      </div>
    </div>
  )
}

export default Todo
