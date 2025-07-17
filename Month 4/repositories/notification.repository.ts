import { Notification, CreateNotificationRequest, UpdateNotificationRequest } from "../interfaces/notification.interface";
import { getConnection } from "../database";

class NotificationModel {
  private tableName = 'locations';
  
  private get knex() {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection is undefined');
    }
    return connection.getClient!();
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.knex(this.tableName)
      .where('id', id)
      .first();

    return notification || null;
  }

  async findByUserId(
    userId: string, 
    limit: number = 50, 
    offset: number = 0,
    isRead?: boolean
  ): Promise<Notification[]> {
    let query = this.knex(this.tableName)
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    if (typeof isRead === 'boolean') {
      query = query.where('is_read', isRead);
    }

    return await query;
  }

  async findByType(
    userId: string, 
    type: string, 
    limit: number = 20
  ): Promise<Notification[]> {
    return await this.knex(this.tableName)
      .where('user_id', userId)
      .where('type', type)
      .orderBy('created_at', 'desc')
      .limit(limit);
  }

  async getUnreadCount(userId: string): Promise<number> {
    const result = await this.knex(this.tableName)
      .where('user_id', userId)
      .where('is_read', false)
      .count('id as count')
      .first();

    return parseInt(result?.count?.toString() || '0');
  }

  async create(notificationData: CreateNotificationRequest): Promise<string> {
    const [notification] = await this.knex(this.tableName)
      .insert({
        ...notificationData,
        created_at: this.knex.fn.now()
      })
      .returning('id');

    return notification.id;
  }

  async markAsRead(id: string, userId: string): Promise<boolean> {
    const updatedRows = await this.knex(this.tableName)
      .where('id', id)
      .where('user_id', userId)
      .update({
        is_read: true
      });

    return updatedRows > 0;
  }

  async markAllAsRead(userId: string): Promise<number> {
    const updatedRows = await this.knex(this.tableName)
      .where('user_id', userId)
      .where('is_read', false)
      .update({
        is_read: true
      });

    return updatedRows;
  }

  async update(id: string, userId: string, updateData: UpdateNotificationRequest): Promise<void> {
    await this.knex(this.tableName)
      .where('id', id)
      .where('user_id', userId)
      .update(updateData);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const deletedRows = await this.knex(this.tableName)
      .where('id', id)
      .where('user_id', userId)
      .del();

    return deletedRows > 0;
  }

  async deleteMultiple(ids: string[], userId: string): Promise<number> {
    const deletedRows = await this.knex(this.tableName)
      .where('user_id', userId)
      .whereIn('id', ids)
      .del();

    return deletedRows;
  }

  async deleteOldNotifications(userId: string, daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const deletedRows = await this.knex(this.tableName)
      .where('user_id', userId)
      .where('created_at', '<', cutoffDate)
      .del();

    return deletedRows;
  }

  async getRecentByType(
    userId: string, 
    type: string, 
    hours: number = 24
  ): Promise<Notification[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hours);

    return await this.knex(this.tableName)
      .where('user_id', userId)
      .where('type', type)
      .where('created_at', '>=', cutoffTime)
      .orderBy('created_at', 'desc');
  }

  async findDuplicateProximityAlert(
    userId: string,
    locationId: string,
    triggerType: string,
    hoursBack: number = 24
  ): Promise<Notification | null> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hoursBack);

    const notification = await this.knex(this.tableName)
      .where('user_id', userId)
      .where('type', 'proximity_alert')
      .where('created_at', '>=', cutoffTime)
      .whereRaw(`metadata->>'location_id' = ?`, [locationId])
      .whereRaw(`metadata->>'trigger_type' = ?`, [triggerType])
      .first();

    return notification || null;
  }

  async getStatsByType(userId: string): Promise<any> {
    return await this.knex(this.tableName)
      .where('user_id', userId)
      .select('type')
      .count('id as count')
      .sum(this.knex.raw('CASE WHEN is_read = false THEN 1 ELSE 0 END as unread_count'))
      .groupBy('type')
      .orderBy('count', 'desc');
  }
}

export const notificationModel = new NotificationModel();