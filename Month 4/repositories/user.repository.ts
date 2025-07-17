import bcryptjs from "bcryptjs";
import config from "../config";
import { USER_STATUS } from "../interfaces/user.interface";
import { getConnection } from "../database";

class User {
  private tableName = 'users';
  
  private get knex() {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection is undefined');
    }
    return connection.getClient!();
  }
  
  async create(userData: any) {
    const hashedPassword = await bcryptjs.hash(userData.password, Number(config.salt_round));
    
    const userToInsert = {
      ...userData,
      password: hashedPassword,
      status: userData.status || USER_STATUS.ACTIVE
    };

    const [insertedUser] = await this.knex(this.tableName)
      .insert(userToInsert)
      .returning('*');

    const { password, ...userWithoutPassword } = insertedUser;
    return userWithoutPassword;
  }

  async findById(id : string ) {
    const query = this.knex(this.tableName).where({ id });
    
    return query.first();
  }

  async findByEmail(email: string, includePassword = false) {
    const query = this.knex(this.tableName).where({ email });
    
    if (!includePassword) {
      query.select('*').select(this.knex.raw('NULL as password'));
    }
    
    return query.first();
  }

  async findByEmailWithPassword(email: string) {
    return this.knex(this.tableName)
      .where({ email })
      .first();
  }

  async updateById(id: string, updateData: Record<string, any>) {
    const userId = (typeof id === 'object' && id !== null && '_id' in id) ? (id as { _id: string })._id : id;
    if (updateData.password) {
      updateData.password = await bcryptjs.hash(updateData.password, Number(config.salt_round));
      updateData.passwordChangedAt = new Date();
    }

    const [updatedUser] = await this.knex(this.tableName)
      .where({ id: userId })
      .update({
        ...updateData,
        updated_at: new Date()
      })
      .returning('*');
    if (updatedUser) {
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    }

    return null;
  }

  async updatePassword(id: string , newPassword: string) {
    const hashedPassword = await bcryptjs.hash(newPassword, Number(config.salt_round));
    
    return this.updateById(id, {
      password: hashedPassword,
      password_changed_at: new Date()
    });
  }

  async findAll(filters = {}) {
    return this.knex(this.tableName)
      .select('id', 'name', 'role', 'email', 'status', 'password_changed_at', 'created_at', 'updated_at')
      .where(filters);
  }

  async deleteById(id : string) {
    console.log("Deleting user with ID:", id);
    return this.knex(this.tableName)
      .where({ id })
      .del();
  }

  async wasPasswordChangedAfter(userId: string, timestamp: string | Date) {
    const user = await this.knex(this.tableName)
      .select('password_changed_at')
      .where({ id: userId })
      .first();

    if (!user || !user.password_changed_at) {
      return false;
    }

    return new Date(user.password_changed_at) > new Date(timestamp);
  }
}
export const userModel =  new User();