import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import ListToDoLists from "./ListTodoLists"
import ToDoList from "./ToDoList"
import './App.css'
import { createList, getLists,deleteList } from './api/todoApi'

function App() {
  const [listSummaries, setListSummaries] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    reloadData()
    
  },[])

// refreshing the listTodoLists
  async function reloadData() {
    try{
      const data = await getLists();
      console.log(Array.isArray(data))
      console.log(data)
      setListSummaries(data)
    } catch(error) {
      console.error("Failed to load lists:", error)
      setListSummaries([])
    }
  }


  async function handleNewToDoList(newName) {
    try {
      await createList(newName)
      await reloadData()
    } catch(e) {
      console.error("Failed to create list:", e)
    }
  }

  async function handleDeleteToDoList(id){
      try{
        await deleteList(id)
        await reloadData()
      } catch(e) {
        console.error("Failed to delete list", e)
      }
  }

  function handleSelectList(id) {
    console.log("Selecting item", id)
    setSelectedItem(id)
  }

  function backToList() {
    setSelectedItem(null)
    reloadData().catch(console.error)
  }


  if(selectedItem === null){
    return (
      <div className='App'>
        <ListToDoLists 
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </div>
    )
  } else {
    return (
      <div className='App'>
        <ToDoList listId={selectedItem} handleBackButton={backToList} />
      </div>
    )
  }
}


export default App