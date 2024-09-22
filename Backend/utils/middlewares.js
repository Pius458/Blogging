
const tokenExtractor = async (request,response,next) => {
    const authorization = await request.get('authorization')

    if (authorization && authorization.startsWith('Bearer')) {
       return request.token =  authorization.replace('Bearer', '')
    }

    return null

}

const unknownEndPoint = async (request, response) => {
    response.status(404).json({error: 'Unknown Endpoint'})
}

module.exports = {
    unknownEndPoint,
    tokenExtractor
}