import "./ToDoList.css"
import {useEffect, useState, useRef} from "react"
import axios from "axios"
import { BiSolidTrash } from "react-icons/bi"
import { createItem, deleteItems, getListDetails, updateToggle } from "./api/todoApi"

const ToDoList = ({listId, handleBackButton}) => {
    let labelRef = useRef()
    const [listData, setListData] = useState(null)

    useEffect(() => {
        fetchData()
    },[listId])

    async function fetchData() {
        const newData = await getListDetails(listId)
        setListData(newData)
    }

    async function handleCreateItem(label){
        const data = await createItem(label, listData.id)
        setListData(data)
    }

    async function handleDeleteItem(id) {
        const data = await deleteItems(id, listData.id)
        setListData(data)
    }
 
    async function handleCheckToggle(itemId, newState) {
        const data = await updateToggle(listData.id, itemId, newState)
        setListData(data)
    }

    if(listData === null){
        return (    
            <div className="ToDoList loading">
                <button className="back" onClick={handleBackButton}>Back</button>
                Loading to-do list ...
            </div>
        )
    }

    return (
        <div className="ToDoList">
            <button className="back" onClick={handleBackButton} >Back</button>
            <h1>List: {listData.name}</h1>
            <div className="box">
                <label>
                    New Item:&nbsp;
                    <input id={labelRef} type="text" />
                </label>
                <button
                    onClick={() => handleCreateItem(document.getElementById(labelRef).value)}
                >New</button>
            </div>
            {listData.items.length > 0 ? (
                listData.items.map((item) => {
                    return(
                        <div
                            key={item.id}
                            className={item.checked ? "item checked": "item"}
                            onClick={() => handleCheckToggle(item.id, !item.checked)}
                        >
                            <span>{item.checked ? "✅" : "⬜️"} </span>
                            <span className="label">{item.label} </span>
                            <span className="flex"></span>
                            < button
                                className="trash"
                                onClick={(evt) => {
                                evt.stopPropagation();
                                handleDeleteItem(item.id);
                                }}
                            >
                                <BiSolidTrash />
                            </button>
                        </div>
                    )
                })
            ): (
                <div className="box">There are currently no items</div>
            )}
        </div>
    )
}

export default ToDoList;

{/* ✅ stopPropagation() prevents that
It stops the click event from bubbling up to the parent div. So:

If you click the trash icon:

Only handleDeleteItem is called.

handleCheckToggle is not called. */}