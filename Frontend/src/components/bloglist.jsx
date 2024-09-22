
const BlogList = ({blogs}) => {
    return (
      <div style={{margin:"2em"}}>
        <h1>Blog list</h1>
        <ul>
          {
            blogs.map( (blog, index) => (
              <li key = {index}>
                <h2>{blog.title}</h2>
                <p><i>Author: </i> {blog.author}</p>
                <p><i>Likes: </i> {blog.likes} </p>
                <p><i>url: </i> {blog.url}</p>
              </li>
            ))
          }
  
        </ul>
      </div>
    )
  }

  export default BlogList