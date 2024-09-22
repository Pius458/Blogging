const dummy = (blogs) => {
    return blogs.length === 0 ? 1 : 1
}

const totalLikes = (blogs) => {
   return blogs.reduce((sum,blog) => {
    return sum + blog.likes
   },0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((maxBlog,currentBlog) => {
        return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
    })
}

const mostBlogs = (blogs) => {
    return blogs.reduce((acc,str) => {
        return (toString(acc.author[str.author]) == toString(acc.author[str.author]) || 0) + 1
    })
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}