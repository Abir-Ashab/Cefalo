import { getConnection } from "../database";
import {WishlistLocation} from "../interfaces/proximity.interface";
import { 
  ProximitySettings,
  ProximityAlert,
  UserLocation,
  ProximityMatch,
  NearbyItem,
  GetProximityAlertsRequest,
  ProximityLogEntry
} from "../interfaces/proximity.interface";

class ProximityModel {
  private proximitySettingsTable = 'proximity_settings';
  private proximityLogTable = 'user_proximity_log';
  private usersTable = 'users';
  private locationsTable = 'locations';
  private wishlistsTable = 'wishlists';
  private wishlistItemsTable = 'wishlist_items';
  private postsTable = 'posts';
  private attractionsTable = 'attractions';
  private accommodationTable = 'accommodation';
  private diningTable = 'dining';

  private get knex() {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection is undefined');
    }
    return connection.getClient!();
  }


  private normalizeRadius(radiusKm: number | string): number {
    const radius = typeof radiusKm === 'string' ? parseFloat(radiusKm) : radiusKm;
    
    if (isNaN(radius) || radius < 0) {
      throw new Error('Invalid radius: must be a positive number');
    }
    
    return Math.round(radius * 1000) / 1000; // Round to 3 decimal places
  }

  private radiusToMeters(radiusKm: number): number {
    return Math.round(this.normalizeRadius(radiusKm) * 1000);
  }

  async findSettingsByUserId(userId: string): Promise<ProximitySettings | null> {
    const settings = await this.knex(this.proximitySettingsTable)
      .where('user_id', userId)
      .first();

    return settings || null;
  }

  async findSettingsById(settingsId: string): Promise<ProximitySettings | null> {
    const settings = await this.knex(this.proximitySettingsTable)
      .where('id', settingsId)
      .first();

    return settings || null;
  }

  async createSettings(settingsData: any): Promise<string> {
    const [settings] = await this.knex(this.proximitySettingsTable)
      .insert(settingsData)
      .returning('id');

    return settings.id;
  }

  async updateSettings(settingsId: string, updateData: any): Promise<number> {
    return await this.knex(this.proximitySettingsTable)
      .where('id', settingsId)
      .update({
        ...updateData,
        updated_at: this.knex.fn.now()
      });
  }

  async updateUserLocation(userId: string, locationData: any): Promise<void> {
    const latitude = parseFloat(locationData.latitude);
    const longitude = parseFloat(locationData.longitude);
    
    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid coordinates: latitude and longitude must be valid numbers');
    }

    await this.knex(this.usersTable)
      .where('id', userId)
      .update({
        current_latitude: latitude,
        current_longitude: longitude,
        location_updated_at: this.knex.fn.now(),
        updated_at: this.knex.fn.now()
      });
  }

  async getUserLocation(userId: string): Promise<UserLocation | null> {
    const user = await this.knex(this.usersTable)
      .select('id', 'current_latitude', 'current_longitude', 'location_updated_at')
      .where('id', userId)
      .first();

    if (!user || !user.current_latitude || !user.current_longitude) {
      return null;
    }

    return {
      user_id: user.id,
      latitude: parseFloat(user.current_latitude),
      longitude: parseFloat(user.current_longitude),
      updated_at: user.location_updated_at
    };
  }

  async findAlertsByUserId(userId: string, queryParams: GetProximityAlertsRequest): Promise<ProximityMatch[]> {
    let query = this.knex(this.proximityLogTable + ' as pl')
      .select([
        'pl.id',
        'pl.trigger_type',
        'pl.distance_km',
        'pl.created_at',
        'l.id as location_id',
        'l.name as location_name',
        'l.country',
        'l.region',
        'u.id as target_user_id',
        'u.name as target_user_name'
      ])
      .leftJoin(this.locationsTable + ' as l', 'pl.location_id', 'l.id')
      .leftJoin(this.usersTable + ' as u', 'pl.target_user_id', 'u.id')
      .where('pl.user_id', userId)
      .orderBy('pl.created_at', 'desc');

    if (queryParams.trigger_type) {
      query = query.where('pl.trigger_type', queryParams.trigger_type);
    }

    if (queryParams.limit) {
      query = query.limit(queryParams.limit);
    }

    if (queryParams.offset) {
      query = query.offset(queryParams.offset);
    }

    const alerts = await query;
    console.log(alerts);
    
    return alerts.map(alert => ({
      id: alert.id,
      user_id: userId,
      trigger_type: alert.trigger_type,
      distance_km: parseFloat(alert.distance_km),
      location_id: alert.location_id,
      location_name: alert.location_name,
      location: {
        id: alert.location_id,
        name: alert.location_name,
        country: alert.country,
        region: alert.region
      },
      target_user: alert.target_user_id ? {
        id: alert.target_user_id,
        name: alert.target_user_name
      } : null,
      created_at: alert.created_at
    }));
  }

  async findAlertHistory(userId: string, limit: number = 50, offset: number = 0): Promise<ProximityAlert[]> {
    const alerts = await this.knex(this.proximityLogTable)
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    return alerts;
  }

  async deleteAlert(alertId: string, userId: string): Promise<boolean> {
    const deletedRows = await this.knex(this.proximityLogTable)
      .where('id', alertId)
      .where('user_id', userId)
      .del();

    return deletedRows > 0;
  }

  async findRecentAlert(userId: string, locationId: string, triggerType: string, hoursAgo: number): Promise<any> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hoursAgo);
    
    return await this.knex(this.proximityLogTable)
      .where('user_id', userId)
      .where('location_id', locationId)
      .where('trigger_type', triggerType)
      .where('created_at', '>', cutoffTime)
      .first();
  }

  async findNearbyWishlistLocations(userId: string, radiusKm: number | string): Promise<NearbyItem[]> {
  const normalizedRadius = this.normalizeRadius(radiusKm);
  const radiusMeters = this.radiusToMeters(normalizedRadius);

  const query = `
    SELECT DISTINCT
      l.id,
      l.name,
      l.country,
      l.region,
      l.latitude,
      l.longitude,
      ROUND(CAST(ST_Distance(u.geom, l.geom) / 1000.0 AS NUMERIC), 3) as distance_km
    FROM ${this.locationsTable} l
    JOIN ${this.wishlistItemsTable} wi ON wi.location_id = l.id
    JOIN ${this.wishlistsTable} w ON wi.wishlist_id = w.id
    JOIN ${this.usersTable} u ON u.id = ?
    WHERE w.is_public = true
      AND u.geom IS NOT NULL
      AND l.geom IS NOT NULL
      AND ST_DWithin(u.geom, l.geom, ?)
    ORDER BY distance_km ASC
  `;

  const results = await this.knex.raw(query, [userId, radiusMeters]);

  return results.rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    location: {
      id: row.id,
      name: row.name,
      country: row.country,
      region: row.region,
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude)
    },
    distance_km: parseFloat(row.distance_km)
  }));
}

  async findNearbyTripParticipants(userId: string, radiusKm: number | string): Promise<NearbyItem[]> {
    const normalizedRadius = this.normalizeRadius(radiusKm);
    const radiusMeters = this.radiusToMeters(normalizedRadius);
    
    const query = `
      SELECT DISTINCT
        l.id,
        l.name,
        l.country,
        l.region,
        l.latitude,
        l.longitude,
        ROUND(CAST(ST_Distance(u.geom, l.geom) / 1000.0 AS NUMERIC), 3) as distance_km
      FROM ${this.locationsTable} l
      JOIN ${this.wishlistItemsTable} wi ON wi.location_id = l.id
      JOIN ${this.wishlistsTable} w ON wi.wishlist_id = w.id
      JOIN ${this.usersTable} u ON u.id = ?
      WHERE w.is_public = true
        AND u.geom IS NOT NULL
        AND l.geom IS NOT NULL
        AND ST_DWithin(u.geom, l.geom, ?)
      ORDER BY distance_km ASC
    `;

    const results = await this.knex.raw(query, [userId, radiusMeters]);

    return results.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      location: {
        id: row.location_id,
        name: row.location_name,
        country: row.country,
        region: row.region,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude)
      },
      distance_km: parseFloat(row.distance_km)
    }));
  }

  async findNearbyFeaturedPosts(userId: string, radiusKm: number | string): Promise<NearbyItem[]> {
    const normalizedRadius = this.normalizeRadius(radiusKm);
    const radiusMeters = this.radiusToMeters(normalizedRadius);
    
    const query = `
      SELECT DISTINCT
        p.id,
        p.title as name,
        l.id as location_id,
        l.name as location_name,
        l.country,
        l.region,
        l.latitude,
        l.longitude,
        ROUND(CAST(ST_Distance(u.geom, l.geom) / 1000.0 AS NUMERIC), 3) as distance_km
      FROM ${this.postsTable} p
      JOIN ${this.locationsTable} l ON p.location_id = l.id
      JOIN ${this.usersTable} u ON u.id = ?
      WHERE p.is_featured = true
        AND p.status = 'published'
        AND p.user_id != ?
        AND u.geom IS NOT NULL
        AND l.geom IS NOT NULL
        AND ST_DWithin(u.geom, l.geom, ?)
      ORDER BY distance_km ASC
    `;

    const results = await this.knex.raw(query, [userId, userId, radiusMeters]);

    return results.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      location: {
        id: row.location_id,
        name: row.location_name,
        country: row.country,
        region: row.region,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude)
      },
      distance_km: parseFloat(row.distance_km)
    }));
  }

  async findNearbyAttractions(userId: string, radiusKm: number | string): Promise<NearbyItem[]> {
    const normalizedRadius = this.normalizeRadius(radiusKm);
    const radiusMeters = this.radiusToMeters(normalizedRadius);
    
    console.log(`Finding attractions within ${normalizedRadius}km (${radiusMeters}m) for user ${userId}`);
    
    const query = `
      SELECT DISTINCT
        a.id,
        a.attraction_name as name,
        l.id as location_id,
        l.name as location_name,
        l.country,
        l.region,
        l.latitude,
        l.longitude,
        ROUND(CAST(ST_Distance(u.geom, l.geom) / 1000.0 AS NUMERIC), 3) as distance_km
      FROM ${this.attractionsTable} a
      JOIN ${this.locationsTable} l ON a.location_id = l.id
      JOIN ${this.usersTable} u ON u.id = ?
      WHERE a.recommended = true
        AND u.geom IS NOT NULL
        AND l.geom IS NOT NULL
        AND ST_DWithin(u.geom, l.geom, ?)
      ORDER BY distance_km ASC
    `;

    const results = await this.knex.raw(query, [userId, radiusMeters]);

    return results.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      location: {
        id: row.location_id,
        name: row.location_name,
        country: row.country,
        region: row.region,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude)
      },
      distance_km: parseFloat(row.distance_km)
    }));
  }

  async findNearbyAccommodations(userId: string, radiusKm: number | string): Promise<NearbyItem[]> {
    const normalizedRadius = this.normalizeRadius(radiusKm);
    const radiusMeters = this.radiusToMeters(normalizedRadius);
    
    const query = `
      SELECT DISTINCT
        acc.id,
        acc.name,
        l.id as location_id,
        l.name as location_name,
        l.country,
        l.region,
        l.latitude,
        l.longitude,
        ROUND(CAST(ST_Distance(u.geom, l.geom) / 1000.0 AS NUMERIC), 3) as distance_km
      FROM ${this.accommodationTable} acc
      JOIN ${this.locationsTable} l ON acc.location_id = l.id
      JOIN ${this.usersTable} u ON u.id = ?
      WHERE acc.rating >= 4.0
        AND u.geom IS NOT NULL
        AND l.geom IS NOT NULL
        AND ST_DWithin(u.geom, l.geom, ?)
      ORDER BY distance_km ASC
    `;

    const results = await this.knex.raw(query, [userId, radiusMeters]);

    return results.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      location: {
        id: row.location_id,
        name: row.location_name,
        country: row.country,
        region: row.region,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude)
      },
      distance_km: parseFloat(row.distance_km)
    }));
  }

  async findNearbyDining(userId: string, radiusKm: number | string): Promise<NearbyItem[]> {
    const normalizedRadius = this.normalizeRadius(radiusKm);
    const radiusMeters = this.radiusToMeters(normalizedRadius);
    
    const query = `
      SELECT DISTINCT
        d.id,
        d.restaurant_name as name,
        l.id as location_id,
        l.name as location_name,
        l.country,
        l.region,
        l.latitude,
        l.longitude,
        ROUND(CAST(ST_Distance(u.geom, l.geom) / 1000.0 AS NUMERIC), 3) as distance_km
      FROM ${this.diningTable} d
      JOIN ${this.locationsTable} l ON d.location_id = l.id
      JOIN ${this.usersTable} u ON u.id = ?
      WHERE d.rating >= 4.0
        AND u.geom IS NOT NULL
        AND l.geom IS NOT NULL
        AND ST_DWithin(u.geom, l.geom, ?)
      ORDER BY distance_km ASC
    `;

    const results = await this.knex.raw(query, [userId, radiusMeters]);

    return results.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      location: {
        id: row.location_id,
        name: row.location_name,
        country: row.country,
        region: row.region,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude)
      },
      distance_km: parseFloat(row.distance_km)
    }));
  }

  async findNearbyItems(
    userId: string, 
    radiusKm: number | string, 
    itemType: 'wishlist' | 'attractions' | 'accommodations' | 'dining' | 'posts' | 'participants'
  ): Promise<NearbyItem[]> {
    switch (itemType) {
      case 'wishlist':
        return this.findNearbyWishlistLocations(userId, radiusKm);
      case 'attractions':
        return this.findNearbyAttractions(userId, radiusKm);
      case 'accommodations':
        return this.findNearbyAccommodations(userId, radiusKm);
      case 'dining':
        return this.findNearbyDining(userId, radiusKm);
      case 'posts':
        return this.findNearbyFeaturedPosts(userId, radiusKm);
      case 'participants':
        return this.findNearbyTripParticipants(userId, radiusKm);
      default:
        throw new Error(`Unsupported item type: ${itemType}`);
    }
  }

  async logProximityEvent(logData: any): Promise<string> {
    console.log(logData);
    if (logData.distance_km) {
      logData.distance_km = this.normalizeRadius(logData.distance_km);
    }
    
    const [logEntry] = await this.knex(this.proximityLogTable)
      .insert(logData)
      .returning('id');

    return logEntry.id;
  }

  async getProximityLogs(userId: string, limit: number = 100): Promise<ProximityLogEntry[]> {
    const logs = await this.knex(this.proximityLogTable)
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .limit(limit);

    return logs.map(log => ({
      ...log,
      distance_km: log.distance_km ? parseFloat(log.distance_km) : null
    }));
  }

  async cleanupOldLogs(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    return await this.knex(this.proximityLogTable)
      .where('created_at', '<', cutoffDate)
      .del();
  }

  validateRadius(radiusKm: number | string, minRadius: number = 0.001, maxRadius: number = 10000): boolean {
    const radius = this.normalizeRadius(radiusKm);
    return radius >= minRadius && radius <= maxRadius;
  }

  async calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): Promise<number> {
    const query = `
      SELECT ROUND(
        CAST(
          ST_Distance(
            ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography,
            ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
          ) / 1000.0 AS NUMERIC
        ), 3
      ) as distance_km
    `;
    
    const result = await this.knex.raw(query, [lon1, lat1, lon2, lat2]);
    return parseFloat(result.rows[0].distance_km);
  }
}

export const proximityModel = new ProximityModel();