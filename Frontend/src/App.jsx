import React from "react";
import { useEffect,useState } from "react";
import BlogList from "./components/bloglist";
import BlogForm from "./components/form"
import Header from "./components/header";
import blogService from "./services/blog"


const App = () => {
  const [blogs, setBlogs] = useState()
  const [title, setTitle] = useState('')
  const [author, setAuthor]  = useState('')
  const [likes, setLikes] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAllBlogs()
        .then(innitialBlogs => {
          setBlogs(innitialBlogs)
        })
        .catch ((exception) => {
          console.log("Failed to fetch")
        })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBlog = {
      title : title,
      author : author,
      likes : likes,
      url : url
    }
    setBlogs(newBlog)
    setTitle('')
    setAuthor('')
    setLikes('')
    setUrl('')
  }

  const handleChange = (e) => {
    const {name,value} = e.target

    if(name === 'title'){
      setTitle(value)
    }else if(name === 'author'){
      setAuthor(value)
    }else if(name === 'likes') {
      setLikes(value)
    }else if (name === "url") {
      setUrl(value)
    }
  }

  const Form = () => (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
      Title:
      <input type="text" name="title" value={title} onChange={handleChange} /> 
      <p>
        Author:
        <input type="text" name="author" value={author} onChange={handleChange}/>
      </p>
      <p>
        Likes: 
        <input type="number" name="likes" value={likes} onChange={handleChange} /> 
      </p>
      <p>
        URL:
        <input type="url" name="url" value={url} onChange={handleChange} />
      </p>
      <div>
        <button type="submit">Add</button>
      </div>
      </div>
      </form>
    </div>
  
  
  )


  return (
     <div>
      <div>
        <Header />
      </div>
      <Form />
      <BlogList blogs={blogs} />
     </div>
  )
}

export default App