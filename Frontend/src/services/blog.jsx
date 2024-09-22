import axios from "axios";

const baseUrl = '/api/blogs'

const getAllBlogs = async () => {
    const response = await axios.get(baseUrl)

    return response.data
}

export default {
    getAllBlogs
}