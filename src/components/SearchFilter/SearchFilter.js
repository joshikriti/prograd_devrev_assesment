import React, {useState} from 'react'
import "./searchFilter.css";

const SearchFilter = ({trigger}) => {
    const [data, setData] = useState({ author: "Ruskin Bond", title: "", publisher: "", subject:"", date: ""})

  const updateData = e => {
    const fieldName = e.target.name
    setData(existingValues => ({
      ...existingValues,
      [fieldName]: e.target.value,
    }))
  }

  const handleClick = () =>{
    trigger(data);
  }

  return (
    <div className='searchList'>
        <div>
            <label htmlFor="author">Author: </label>
            <input
            type="text"
            name="author"
            id="author"
            value={data.author}
            onChange={updateData}
            />
        </div>
        <div>
            <label htmlFor="title">Title: </label>
            <input
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={updateData}
            />
        </div>
        <div>
            <label htmlFor="publisher">Publisher: </label>
            <input
            type="text"
            name="publisher"
            id="publisher"
            value={data.publisher}
            onChange={updateData}
            />
        </div>
        <div>
            <label htmlFor="subject">Subject: </label>
            <input
            type="text"
            name="subject"
            id="subject"
            value={data.subject}
            onChange={updateData}
            />
        </div>
        
        <div>
            <label htmlFor="date">Publishing Date: </label>
            <input
            type="date"
            name="date"
            id="date"
            max={new Date}
            onChange={updateData}
            />
        </div>
        <div>
            <button className='searchButton' onClick={()=>handleClick(data)}>Search</button>
        </div>
    </div>
  )
}

export default SearchFilter