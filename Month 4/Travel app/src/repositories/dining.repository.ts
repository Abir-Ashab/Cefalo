import { Dining } from "../interfaces/dining.interface";
import { getConnection } from "../database";

class DiningModel {
  private tableName = 'dining';
  
  private get knex() {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection is undefined');
    }
    return connection.getClient!();
  }
  
  private async findOrCreateLocation(locationData: {
    name: string;
    country?: string;
    region?: string;
    latitude: number;
    longitude: number;
    timezone?: string;
  }): Promise<string> {
    const existingLocation = await this.knex('locations')
      .where('latitude', locationData.latitude)
      .andWhere('longitude', locationData.longitude)
      .first();

    if (existingLocation) {
      return existingLocation.id;
    }

    const [newLocation] = await this.knex('locations')
      .insert({
        id: this.knex.raw('uuid_generate_v4()'),
        name: locationData.name,
        country: locationData.country || null,
        region: locationData.region || null,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        timezone: locationData.timezone || 'UTC',
        created_at: this.knex.fn.now(),
      })
      .returning('*');

    return newLocation.id;
  }

  async findByPostId(postId: string): Promise<Dining[]> {
    return await this.knex(this.tableName)
      .where('post_id', postId)
      .orderBy('visit_date', 'desc');
  }

  async findById(id: string): Promise<Dining | null> {
    const dining = await this.knex(this.tableName)
      .where('id', id)
      .first();

    return dining || null;
  }

  async create(diningData: any & { location?: any }): Promise<string> {
    let locationId = null;
    if (diningData.location) {
      locationId = await this.findOrCreateLocation(diningData.location);
    }
    const { location, ...fields } = diningData;

    const [dining] = await this.knex(this.tableName)
      .insert({
        ...fields,
        location_id: locationId,
      })
      .returning('id');

    return dining.id;
  }

  async update(id: string, updateData: any & { location?: any }): Promise<void> {
    let locationId = null;
    if (updateData.location) {
      locationId = await this.findOrCreateLocation(updateData.location);
    }
    const { location, ...fields } = updateData;

    await this.knex(this.tableName)
      .where('id', id)
      .update({
        ...fields,
        ...(locationId ? { location_id: locationId } : {}),
        updated_at: this.knex.fn.now(),
      });
  }

  async delete(id: string): Promise<boolean> {
    const deletedRows = await this.knex(this.tableName)
      .where('id', id)
      .del();

    return deletedRows > 0;
  }
}

export const diningModel = new DiningModel();