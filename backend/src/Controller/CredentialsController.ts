import { Request, Response } from 'express'
import { MongoRepository } from '../db/MongoRepository'
import env from '../config/env'
import ScanController from './ScanController'

interface Database {
  name: string
}

interface CreateRequest {
  server: string
  port: number
  user: string
  password: string
  database: Database[]
}

export default {
  async create(request: Request, response: Response) {
    const {
      server,
      port,
      user,
      password,
      database
    }:CreateRequest = request.body
    
    const mongoRepository = new MongoRepository(env.MONGO_URI)

    database.map(async index => {
      const credentials = {
        server,
        port,
        user,
        password,
        database: index.name
      }
      const data = await ScanController.index(credentials)
      const documentsCollection = await mongoRepository.getCollection('Documents')
      await documentsCollection.insertMany(data)
    })

    return response.status(200).json('Successfully Connected')
  },

  async show(request: Request, response: Response) {
    const { filter } = request.params
    const mongoRepository = new MongoRepository(env.MONGO_URI)
    const documentsCollection = await mongoRepository.getCollection('Documents')
    const result = await documentsCollection.find({Column: {"$regex": filter, "$options": "i"}}).toArray()
    return response.status(200).json(result)
  },

  async destroy(request: Request, response: Response) {
    const mongoRepository = new MongoRepository(env.MONGO_URI)
    const documentsCollection = await mongoRepository.getCollection('Documents')
    await documentsCollection.drop()
    return response.status(200).json('Successfully Disconnected')
  }
}

// 