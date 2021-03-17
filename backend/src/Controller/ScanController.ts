import { SqlServerRepository } from '../db/sqlServerRepository'

export default {
  async index(credentials: any) {
      const sqlServerRepository = new SqlServerRepository(credentials)
      const data = await sqlServerRepository.scan()
      return data
  }
}