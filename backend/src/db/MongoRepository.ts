import { Collection, MongoClient } from "mongodb";

export class MongoRepository {
  private client: MongoClient 
  private readonly uri: string
  
  constructor(uri: string) {
    this.uri = uri
  }

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect(): Promise<void> {
    this.client.close()
  }

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect()
    }
    return this.client.db().collection(name)
  }
}