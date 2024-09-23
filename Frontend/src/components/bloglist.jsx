const BlogList = ({ blogs }) => {
  return (
    <div style={{ margin: "2em" }}>
      <h1>Blog list</h1>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index}>
            <strong>{blog.title}</strong> by {blog.author}, {blog.likes} likes, URL: <a href={blog.url}>{blog.url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
