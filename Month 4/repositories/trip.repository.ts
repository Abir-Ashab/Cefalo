import { TravelPlan, TravelParticipant, Message, TripStatus } from "../interfaces/trip.interface";
import { getConnection } from "../database";

class TripModel {
  private tableName = 'travel_plan';
  private participantsTable = 'travel_participants';
  private messagesTable = 'messages';
  private statusTable = 'trip_status';

  private get knex() {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection is undefined');
    }
    return connection.getClient!();
  }

  // Trip CRUD operations
  async create(tripData: any): Promise<string> {
    const [trip] = await this.knex(this.tableName)
      .insert(tripData)
      .returning('id');
    return trip.id;
  }

  async findById(id: string): Promise<TravelPlan | null> {
    const trip = await this.knex(this.tableName)
      .select(
        'travel_plan.*',
        'users.name as creator_name',
        'locations.name as location_name',
        'trip_status.name as status_name'
      )
      .leftJoin('users', 'travel_plan.creator_id', 'users.id')
      .leftJoin('locations', 'travel_plan.location_id', 'locations.id')
      .leftJoin('trip_status', 'travel_plan.status_id', 'trip_status.id')
      .where('travel_plan.id', id)
      .first();

    return trip || null;
  }

async findByUserId(userId: string, page: number = 1, limit: number = 10): Promise<{ trips: TravelPlan[], total: number }> {
  const offset = (page - 1) * limit;
  const knex = this.knex; // Fix here

  const tripsQuery = knex(this.tableName)
    .select(
      'travel_plan.*',
      'users.name as creator_name',
      'locations.name as location_name',
      'trip_status.name as status_name',
      'tp.role as user_role',
      'tp.status as user_status'
    )
    .leftJoin('users', 'travel_plan.creator_id', 'users.id')
    .leftJoin('locations', 'travel_plan.location_id', 'locations.id')
    .leftJoin('trip_status', 'travel_plan.status_id', 'trip_status.id')
    .leftJoin(`${this.participantsTable} as tp`, function () {
      this.on('travel_plan.id', '=', 'tp.trip_plan_id')
          .andOn('tp.user_id', '=', knex.raw('?', [userId])); // Use captured knex
    })
    .where(function () {
      this.where('travel_plan.creator_id', userId)
          .orWhere('tp.user_id', userId);
    })
    .orderBy('travel_plan.created_at', 'desc')
    .limit(limit)
    .offset(offset);

  const countQuery = knex(this.tableName)
    .leftJoin(`${this.participantsTable} as tp`, function () {
      this.on('travel_plan.id', '=', 'tp.trip_plan_id')
          .andOn('tp.user_id', '=', knex.raw('?', [userId])); // Same fix
    })
    .where(function () {
      this.where('travel_plan.creator_id', userId)
          .orWhere('tp.user_id', userId);
    })
    .count('* as count')
    .first();

  const [trips, countResult] = await Promise.all([tripsQuery, countQuery]);
  const count = countResult?.count ?? 0;

  return {
    trips,
    total: parseInt(count.toString())
  };
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

  async addParticipants(tripId: string, userIds: string[]): Promise<void> {
    const participants = userIds.map(userId => ({
      trip_plan_id: tripId,
      user_id: userId,
      role: 'participant',
      status: 'invited'
    }));

    await this.knex(this.participantsTable)
      .insert(participants)
      .onConflict(['trip_plan_id', 'user_id'])
      .ignore();
  }

  async updateParticipantStatus(tripId: string, userId: string, status: string): Promise<boolean> {
    const updateData: any = { status };
    if (status === 'joined') {
      updateData.joined_at = this.knex.fn.now();
    }

    const updatedRows = await this.knex(this.participantsTable)
      .where({
        trip_plan_id: tripId,
        user_id: userId
      })
      .update(updateData);

    return updatedRows > 0;
  }

  async getParticipants(tripId: string): Promise<TravelParticipant[]> {
    return await this.knex(this.participantsTable)
      .select(
        'travel_participants.*',
        'users.name as user_name',
        'users.email as user_email',
        'users.profile_picture'
      )
      .leftJoin('users', 'travel_participants.user_id', 'users.id')
      .where('trip_plan_id', tripId)
      .orderBy('travel_participants.created_at', 'asc');
  }

  async removeParticipant(tripId: string, userId: string): Promise<boolean> {
    const deletedRows = await this.knex(this.participantsTable)
      .where({
        trip_plan_id: tripId,
        user_id: userId,
        role: 'participant' 
      })
      .del();

    return deletedRows > 0;
  }

  async createMessage(messageData: any): Promise<string> {
    const [message] = await this.knex(this.messagesTable)
      .insert(messageData)
      .returning('id');
    return message.id;
  }

  async getMessages(tripId: string, page: number = 1, limit: number = 50): Promise<Message[]> {
    const offset = (page - 1) * limit;

    return await this.knex(this.messagesTable)
      .select(
        'messages.*',
        'users.name as sender_name',
        'users.profile_picture as sender_profile_picture'
      )
      .leftJoin('users', 'messages.sender_id', 'users.id')
      .where('trip_plan_id', tripId)
      .orderBy('messages.created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  async getUserInvites(userId: string): Promise<any[]> {
    return await this.knex(this.participantsTable)
      .select(
        'travel_participants.id',
        'travel_plan.trip_name',
        'travel_plan.start_date',
        'travel_plan.end_date',
        'travel_participants.status',
        'travel_participants.created_at',
        'users.name as creator_name',
        'locations.name as location_name'
      )
      .join('travel_plan', 'travel_participants.trip_plan_id', 'travel_plan.id')
      .join('users', 'travel_plan.creator_id', 'users.id')
      .join('locations', 'travel_plan.location_id', 'locations.id')
      .where({
        'travel_participants.user_id': userId,
        'travel_participants.status': 'invited'
      })
      .orderBy('travel_participants.created_at', 'desc');
  }

  async getAllStatuses(): Promise<TripStatus[]> {
    return await this.knex(this.statusTable)
      .select('*')
      .orderBy('created_at', 'asc');
  }

  async getStatusByName(name: string): Promise<TripStatus | null> {
    const status = await this.knex(this.statusTable)
      .where('name', name)
      .first();
    return status || null;
  }

  async isUserParticipant(tripId: string, userId: string): Promise<boolean> {
    const participant = await this.knex(this.participantsTable)
      .where({
        trip_plan_id: tripId,
        user_id: userId
      })
      .first();

    return !!participant;
  }

  async isUserCreator(tripId: string, userId: string): Promise<boolean> {
    const trip = await this.knex(this.tableName)
      .where({
        id: tripId,
        creator_id: userId
      })
      .first();

    return !!trip;
  }

  async getParticipantCount(tripId: string): Promise<number> {
    const result = await this.knex(this.participantsTable)
      .where('trip_plan_id', tripId)
      .count('* as count')
      .first();

    if (!result || result.count === undefined) {
      return 0;
    }
    return parseInt(result.count.toString());
  }

  async updateParticipantRole(tripId: string, userId: string, role: string): Promise<boolean> {
    const updatedRows = await this.knex(this.participantsTable)
      .where({
        trip_plan_id: tripId,
        user_id: userId
      })
      .update({ role });

    return updatedRows > 0;
  }
}

export const tripModel = new TripModel();