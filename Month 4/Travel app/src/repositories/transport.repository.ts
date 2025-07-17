import { Transport } from '../interfaces/transport.interface';
import { getConnection } from "../database";

class TransportModel {
  private tableName = 'transports';
  
  private get knex() {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection is undefined');
    }
    return connection.getClient!();
  }

  async findByPostId(postId: string): Promise<Transport[]> {
    return await this.knex(this.tableName)
      .where('post_id', postId)
      // .orderBy('created_at', 'asc');
  }

  async findById(id: string): Promise<Transport | null> {
    const transport = await this.knex(this.tableName)
      .where('id', id)
      .first();

    return transport || null;
  }

  async create(transportData: any): Promise<string> {
    const [transport] = await this.knex(this.tableName)
      .insert(transportData)
      .returning('id');

    return transport.id;
  }

  async update(id: string, updateData: any): Promise<void> {
    await this.knex(this.tableName)
      .where('id', id)
      .update({
        ...updateData,
        updated_at: this.knex.fn.now()
      });
  }

  async delete(id: string): Promise<boolean> {
    const deletedRows = await this.knex(this.tableName)
      .where('id', id)
      .del();

    return deletedRows > 0;
  }
}

export const transportModel = new TransportModel();