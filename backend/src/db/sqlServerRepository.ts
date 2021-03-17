import { ConnectionPool } from 'mssql'

interface CredentialsSqlServer {
  user: string;
  password: string;
  server: string;
  port: number;
  database: string;
}

export class SqlServerRepository {
  private readonly crendetials
  private client

  constructor(crendetials: CredentialsSqlServer){
    this.crendetials = crendetials
    this.client = new ConnectionPool(crendetials)
  }

  async scan() {
    if(!this.client.connected) {
      await this.client.connect()
    }
    const result = await this.client.query('SELECT TABLE_CATALOG	AS [Database],TABLE_SCHEMA	AS [Schema],TABLE_NAME		AS [Table],	COLUMN_NAME		AS [Column],DATA_TYPE		AS [DataType] from information_schema.columns')
    return result.recordset
  }
}

