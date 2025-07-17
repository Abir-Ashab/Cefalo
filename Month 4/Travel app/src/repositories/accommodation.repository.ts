import { Accommodation } from "../interfaces/accommodation.interface";
import { getConnection } from '../database';

class AccommodationModel {
  private tableName = 'accommodation';
  
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
        created_at: this.knex.fn.now() ,
      })
      .returning('*');

    return newLocation.id;
  }

  async findByPostId(postId: string): Promise<Accommodation[]> {
    return await this.knex(this.tableName)
      .where('post_id', postId)
      .orderBy('check_in_date', 'asc');
  }

  async findById(id: string): Promise<Accommodation | null> {
    const accommodation = await this.knex(this.tableName)
      .where('id', id)
      .first();

    return accommodation || null;
  }

  async create(accommodationData: any & { location?: any }): Promise<string> {
    let locationId = null;
    if (accommodationData.location) {
      locationId = await this.findOrCreateLocation(accommodationData.location);
    }

    const { location, ...accomFields } = accommodationData;

    const [accommodation] = await this.knex(this.tableName)
      .insert({
        ...accomFields,
        location_id: locationId,
        // created_at: this.knex.fn.now(),
      })
      .returning('id');

    return accommodation.id;
  }

  async update(id: string, updateData: any & { location?: any }): Promise<void> {
    let locationId = null;
    if (updateData.location) {
      locationId = await this.findOrCreateLocation(updateData.location);
    }

    const { location, ...updateFields } = updateData;

    await this.knex(this.tableName)
      .where('id', id)
      .update({
        ...updateFields,
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

export const accommodationModel = new AccommodationModel();