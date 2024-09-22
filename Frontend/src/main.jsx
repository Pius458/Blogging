import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const blogs = [
  {
    title: 'React Basics',
    author: 'John Doe',
    likes: 20,
    url: 'https://example.com/react-basics'
  },
  {
    title: 'Advanced JavaScript',
    author: 'Jane Smith',
    likes: 35,
    url: 'https://example.com/advanced-js'
  }
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App blogs={blogs}/>
  </StrictMode>,
)
