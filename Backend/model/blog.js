const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: String,
    url: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        default: 0,
        require: false
    },
    users : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

blogSchema.set('toJSON', {
    transform: (document,requestedData) => {
        requestedData.id = requestedData._id.toString()
        delete requestedData._id
        delete requestedData.__v
    }
  }
)

module.exports = mongoose.model('Blog', blogSchema)