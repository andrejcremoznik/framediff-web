import io from 'socket.io-client'
import feathers from '@feathersjs/client'

const socket = io('http://localhost:3030')
const client = feathers()

client.configure(feathers.socketio(socket))

export const objectsService = client.service('objects')
export const sessionsService = client.service('sessions')

export default client
