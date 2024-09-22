

const BlogForm = ({handleChange,title}) => (
    <div>
            <input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={handleChange}
            />
    </div>
)

export default {
    BlogForm
}