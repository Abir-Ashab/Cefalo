import {
  Wishlist,
  WishlistItem,
  WishlistWithItems,
  WishlistItemWithLocation,
  CreateWishlistRequest,
  UpdateWishlistRequest,
  CreateWishlistItemRequest,
  UpdateWishlistItemRequest,
  WishlistFilters
} from '../interfaces/wishlist.interface';
import { getConnection } from '../database';

class WishlistModel {
  private tableName = 'wishlists';
  
  private get knex() {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection is undefined');
    }
    return connection.getClient!();
  }

  async create(userId: string, data: CreateWishlistRequest): Promise<string> {
    const [wishlist] = await this.knex(this.tableName)
      .insert({
        user_id: userId,
        name: data.name,
        description: data.description,
        grouping_type: data.grouping_type,
        is_public: data.is_public || false
      })
      .returning('id');

    return wishlist.id;
  }

  async findById(id: string): Promise<Wishlist | null> {
    const wishlist = await this.knex(this.tableName).where('id', id).first();
    return wishlist || null;
  }

  async findWithItems(id: string): Promise<WishlistWithItems | null> {
    const wishlist = await this.knex(this.tableName).where('id', id).first();
    if (!wishlist) return null;

    const items = await this.knex('wishlist_items')
      .join('locations', 'wishlist_items.location_id', 'locations.id')
      .where('wishlist_items.wishlist_id', id)
      .select(
        'wishlist_items.*',
        'locations.id as location_id',
        'locations.name as location_name',
        'locations.country as location_country',
        'locations.region as location_region',
        'locations.latitude as location_latitude',
        'locations.longitude as location_longitude',
        'locations.timezone as location_timezone'
      )
      .orderBy('wishlist_items.priority_level', 'asc');

    const wishlistItems: WishlistItemWithLocation[] = items.map(item => ({
      id: item.id,
      wishlist_id: item.wishlist_id,
      location_id: item.location_id,
      notes: item.notes,
      estimated_budget: item.estimated_budget,
      priority_level: item.priority_level,
      preferred_start_date: item.preferred_start_date,
      preferred_end_date: item.preferred_end_date,
      created_at: item.created_at,
      updated_at: item.updated_at,
      location: {
        id: item.location_id,
        name: item.location_name,
        country: item.location_country,
        region: item.location_region,
        latitude: parseFloat(item.location_latitude),
        longitude: parseFloat(item.location_longitude),
        timezone: item.location_timezone
      }
    }));

    return {
      ...wishlist,
      items: wishlistItems
    };
  }

  async findByUserId(userId: string, filters: WishlistFilters = {}): Promise<Wishlist[]> {
    let query = this.knex(this.tableName).where('user_id', userId);

    if (filters.grouping_type) {
      query = query.where('grouping_type', filters.grouping_type);
    }

    if (filters.is_public !== undefined) {
      query = query.where('is_public', filters.is_public);
    }

    if (filters.search) {
      query = query.where(function () {
        this.where('name', 'ilike', `%${filters.search}%`).orWhere('description', 'ilike', `%${filters.search}%`);
      });
    }

    query = query.orderBy('created_at', 'desc');

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  }

  async findPublic(filters: WishlistFilters = {}): Promise<Wishlist[]> {
    let query = this.knex(this.tableName).where('is_public', true);

    if (filters.grouping_type) {
      query = query.where('grouping_type', filters.grouping_type);
    }

    if (filters.search) {
      query = query.where(function () {
        this.where('name', 'ilike', `%${filters.search}%`).orWhere('description', 'ilike', `%${filters.search}%`);
      });
    }

    query = query.orderBy('created_at', 'desc');

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  }

  async update(id: string, data: UpdateWishlistRequest): Promise<void> {
    await this.knex(this.tableName)
      .where('id', id)
      .update({
        ...data,
        updated_at: this.knex.fn.now()
      });
  }

  async delete(id: string): Promise<boolean> {
    const deletedRows = await this.knex(this.tableName).where('id', id).del();
    return deletedRows > 0;
  }

  async createItem(wishlistId: string, data: CreateWishlistItemRequest): Promise<string> {
    let locationId = data.location_id;

    if (!locationId && data.location) {
      const locationData = {
        name: data.location.name,
        country: data.location.country,
        region: data.location.region,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        timezone: data.location.timezone || null
      };

      const [newLocation] = await this.knex('locations').insert(locationData).returning(['id']);
      locationId = newLocation.id;

      await this.knex.raw(
        `UPDATE locations SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) WHERE id = ?`,
        [locationId]
      );
    }

    const [item] = await this.knex('wishlist_items')
      .insert({
        wishlist_id: wishlistId,
        location_id: locationId,
        notes: data.notes,
        estimated_budget: data.estimated_budget,
        priority_level: data.priority_level,
        preferred_start_date: data.preferred_start_date,
        preferred_end_date: data.preferred_end_date
      })
      .returning('id');

    return item.id;
  }

  async findItemById(id: string): Promise<WishlistItem | null> {
    const item = await this.knex('wishlist_items').where('id', id).first();
    return item || null;
  }

  async updateItem(id: string, data: UpdateWishlistItemRequest): Promise<void> {
    await this.knex('wishlist_items')
      .where('id', id)
      .update({
        ...data,
        updated_at: this.knex.fn.now()
      });
  }

  async deleteItem(id: string): Promise<boolean> {
    const deletedRows = await this.knex('wishlist_items').where('id', id).del();
    return deletedRows > 0;
  }

  async checkOwnership(wishlistId: string, userId: string): Promise<boolean> {
    const wishlist = await this.knex(this.tableName).where({ id: wishlistId, user_id: userId }).first();
    return !!wishlist;
  }

  async checkItemOwnership(itemId: string, userId: string): Promise<boolean> {
    const item = await this.knex('wishlist_items')
      .join('wishlists', 'wishlist_items.wishlist_id', 'wishlists.id')
      .where({ 'wishlist_items.id': itemId, 'wishlists.user_id': userId })
      .first();
    return !!item;
  }

  async checkLocationExists(locationId?: string): Promise<boolean> {
    if (!locationId) return false;
    const location = await this.knex('locations').where({ id: locationId }).first();
    return !!location;
  }

  async checkDuplicateItem(wishlistId: string, locationId: string): Promise<boolean> {
    const existing = await this.knex('wishlist_items')
      .where({ wishlist_id: wishlistId, location_id: locationId })
      .first();
    return !!existing;
  }
}

export const wishlistModel = new WishlistModel();

