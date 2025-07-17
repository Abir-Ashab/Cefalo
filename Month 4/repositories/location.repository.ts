import { Location } from "../interfaces/location.interface"
import { getConnection } from "../database";

interface GetAllLocationsOptions {
  page: number;
  limit: number;
  country?: string;
  region?: string;
}

class LocationModel {
  private tableName = 'locations';
  
  private get knex() {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection is undefined');
    }
    return connection.getClient!();
  }

  async findAll(options: GetAllLocationsOptions): Promise<Location[]> {
    const { page, limit, country, region } = options;
    const offset = (page - 1) * limit;

    let query = this.knex(this.tableName);

    if (country) {
      query = query.where('country', 'ilike', `%${country}%`);
    }

    if (region) {
      query = query.where('region', 'ilike', `%${region}%`);
    }

    return await query
      .orderBy('name', 'asc')
      .limit(limit)
      .offset(offset);
  }

  async search(query: string): Promise<Location[]> {
    return await this.knex(this.tableName)
      .where('name', 'ilike', `%${query}%`)
      .orWhere('country', 'ilike', `%${query}%`)
      .orWhere('region', 'ilike', `%${query}%`)
      .orderBy('name', 'asc')
      .limit(20);
  }

  async findById(id: string): Promise<Location | null> {
    const location = await this.knex(this.tableName)
      .where('id', id)
      .first();

    return location || null;
  }

  async findByNameAndCountry(name: string, country: string): Promise<Location | null> {
    const location = await this.knex(this.tableName)
      .where('name', 'ilike', name)
      .where('country', 'ilike', country)
      .first();

    return location || null;
  }

  async create(locationData: any): Promise<string> {
    const [location] = await this.knex(this.tableName)
      .insert(locationData)
      .returning('id');

    return location.id;
  }

  async update(id: string, updateData: any): Promise<void> {
    await this.knex(this.tableName)
      .where('id', id)
      .update(updateData);
  }

  async delete(id: string): Promise<boolean> {
    const deletedRows = await this.knex(this.tableName)
      .where('id', id)
      .del();

    return deletedRows > 0;
  }
}

export const locationModel = new LocationModel();