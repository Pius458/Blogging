import React from "react";
import { useEffect, useState } from "react";
import BlogList from "./components/bloglist";
import BlogForm from "./components/form";
import Header from "./components/header";
import blogService from "./services/blog";

const App = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [likes, setLikes] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService
      .getAllBlogs()
      .then(initialBlogs => {
        console.log("Getting all :", initialBlogs)
        setBlogs(initialBlogs);
      })
      .catch((exception) => {
        console.log("Failed to fetch");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      likes: likes,
      url: url,
    };

    setBlogs([...blogs, newBlog]); // Append the new blog to the array
    setTitle('');
    setAuthor('');
    setLikes('');
    setUrl('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'author') {
      setAuthor(value);
    } else if (name === 'likes') {
      setLikes(value);
    } else if (name === 'url') {
      setUrl(value);
    }
  };

  const Form = () => (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title :
          <input type="text" name="title" value={title} onChange={handleChange} />
        </div>
        <div>
          Author : 
          <input type="text" name="author" value={author} onChange={handleChange} />
        </div>
        <div>
          Likes :
          <input type="number" name="likes" value={likes} onChange={handleChange} />
        </div>
        <div>
          URL  :
          <input type="url" name="url" value={url} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Header />
      <Form />
      <ul>
        <BlogList blogs={blogs}/>
      </ul>
    </div>
  );
};

export default App;
