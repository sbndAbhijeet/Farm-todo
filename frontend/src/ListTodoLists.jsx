import "./ListTodoLists.css"
import { useEffect, useRef } from "react"
import {BiSolidTrash} from "react-icons/bi"

const ListToDoLists = ({
  listSummaries,
  handleSelectList,
  handleNewToDoList,
  handleDeleteToDoList,
}) => {
  const inputRef = useRef(null);

  // Handle the input for new list creation
  const handleNewListClick = () => {
    if (inputRef.current?.value.trim()) {
      handleNewToDoList(inputRef.current.value.trim());
      inputRef.current.value = ''; // Clear input after submission
    }
  };

  useEffect(() => {
    console.log(typeof listSummaries)
  })

  if (!Array.isArray(listSummaries)) {
    return (
      <div className="ListToDoLists error">
        <div className="box">
          <label>
            New To-Do List:&nbsp;
            <input ref={inputRef} type="text" disabled />
          </label>
          <button disabled>New</button>
        </div>
        <p>Error: Invalid data format</p>
      </div>
    );
  }

  // Empty state
  if (listSummaries === null) {
    return (
      <div className="ListToDoLists">
        <div className="box">
          <label>
            New To-Do List:&nbsp;
            <input ref={inputRef} type="text" />
          </label>
          <button onClick={handleNewListClick}>New</button>
        </div>
        <p>There are no to-do lists!</p>
      </div>
    );
  }

  // Normal state with lists
  return (
    <div className="ListToDoLists">
      <h1>All To-Do Lists</h1>
      <div className="box">
        <label>
          New To-Do List:&nbsp;
          <input 
            ref={inputRef} 
            type="text" 
            onKeyDown={(e) => e.key === 'Enter' && handleNewListClick()}
          />
        </label>
        <button onClick={handleNewListClick}>New</button>
      </div>
      
      {listSummaries.map((summary) => (
        <div
          key={summary.id}
          className="summary"
          onClick={() => handleSelectList(summary.id)}
        >
          <span className="name">{summary.name}</span>
          <span className="count">{summary.item_count}</span>
          <span className="flex"></span>
          <span
            className="trash"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteToDoList(summary.id);
            }}
          >
            <BiSolidTrash />
          </span>
        </div>
      ))}
    </div>
  );
};

export default ListToDoLists;