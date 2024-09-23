import axios from "axios";

const baseUrl = '/api/blog'

const getAllBlogs = async () => {
    const response = await axios.get(baseUrl)
    console.log("axios get all: ", response)
    return response.data
}

export default {
    getAllBlogs
}