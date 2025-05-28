// Project Structure:
/*
travel-platform/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── app.js
│   │   └── index.js
│   ├── core/
│   │   ├── interfaces/
│   │   │   ├── IUserRepository.js
│   │   │   ├── IPostRepository.js
│   │   │   ├── IWishlistRepository.js
│   │   │   └── IGroupRepository.js
│   │   ├── entities/
│   │   │   ├── User.js
│   │   │   ├── Post.js
│   │   │   ├── Wishlist.js
│   │   │   └── Group.js
│   │   └── services/
│   │       ├── UserService.js
│   │       ├── PostService.js
│   │       ├── WishlistService.js
│   │       └── GroupService.js
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── knex/
│   │   │   │   ├── KnexUserRepository.js
│   │   │   │   ├── KnexPostRepository.js
│   │   │   │   ├── KnexWishlistRepository.js
│   │   │   │   ├── KnexGroupRepository.js
│   │   │   │   └── migrations/
│   │   │   │       ├── 001_create_users.js
│   │   │   │       ├── 002_create_posts.js
│   │   │   │       ├── 003_create_wishlists.js
│   │   │   │       └── 004_create_groups.js
│   │   │   └── factory/
│   │   │       └── RepositoryFactory.js
│   │   └── external/
│   │       └── EmailService.js
│   ├── presentation/
│   │   ├── controllers/
│   │   │   ├── UserController.js
│   │   │   ├── PostController.js
│   │   │   ├── WishlistController.js
│   │   │   └── GroupController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── postRoutes.js
│   │   │   ├── wishlistRoutes.js
│   │   │   └── groupRoutes.js
│   │   └── validators/
│   │       ├── userValidators.js
│   │       ├── postValidators.js
│   │       └── wishlistValidators.js
│   └── utils/
│       ├── logger.js
│       ├── constants.js
│       └── helpers.js
├── knexfile.js
├── package.json
└── .env
*/

// =============================================
// PACKAGE.JSON
// =============================================
const packageJson = {
  "name": "travel-platform",
  "version": "1.0.0",
  "description": "Modular travel platform with DIP implementation",
  "main": "src/config/index.js",
  "scripts": {
    "start": "node src/config/index.js",
    "dev": "nodemon src/config/index.js",
    "migrate": "knex migrate:latest",
    "migrate:rollback": "knex migrate:rollback",
    "seed": "knex seed:run"
  },
  "dependencies": {
    "express": "^4.18.2",
    "knex": "^3.0.1",
    "pg": "^8.11.3",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "joi": "^17.11.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
};

// =============================================
// ENVIRONMENT CONFIGURATION (.env)
// =============================================
const envExample = `
# Database Configuration
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=travel_platform
DB_USER=your_username
DB_PASSWORD=your_password

# Application Configuration
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key

# External Services
EMAIL_SERVICE_API_KEY=your_email_api_key
`;

// =============================================
// KNEX CONFIGURATION (knexfile.js)
// =============================================
const knexfile = `
require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './src/infrastructure/database/knex/migrations'
    },
    seeds: {
      directory: './src/infrastructure/database/knex/seeds'
    }
  },
  
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/infrastructure/database/knex/migrations'
    }
  }
};
`;

// =============================================
// DATABASE CONFIGURATION
// =============================================
// src/config/database.js
const databaseConfig = `
const knex = require('knex');
const knexConfig = require('../../knexfile');

class DatabaseConnection {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      const config = knexConfig[process.env.NODE_ENV || 'development'];
      this.connection = knex(config);
      
      // Test connection
      await this.connection.raw('SELECT 1');
      console.log('Database connected successfully');
      
      return this.connection;
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  getConnection() {
    if (!this.connection) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.connection;
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.destroy();
      this.connection = null;
      console.log('Database disconnected');
    }
  }
}

module.exports = new DatabaseConnection();
`;

// =============================================
// CORE ENTITIES
// =============================================
// src/core/entities/User.js
const userEntity = `
class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.role = data.role || 'explorer'; // explorer, traveler, admin
    this.profile = data.profile || {};
    this.isVerified = data.isVerified || false;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  isExplorer() {
    return this.role === 'explorer';
  }

  isTraveler() {
    return this.role === 'traveler';
  }

  isAdmin() {
    return this.role === 'admin';
  }

  canCreatePosts() {
    return this.role === 'traveler' || this.role === 'admin';
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;
`;

// src/core/entities/Post.js
const postEntity = `
class Post {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.title = data.title;
    this.destination = data.destination;
    this.content = data.content;
    this.images = data.images || [];
    this.budget = data.budget || {};
    this.ratings = data.ratings || {};
    this.tags = data.tags || [];
    this.isPublic = data.isPublic !== false;
    this.isFeatured = data.isFeatured || false;
    this.likesCount = data.likesCount || 0;
    this.savesCount = data.savesCount || 0;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  incrementLikes() {
    this.likesCount += 1;
  }

  decrementLikes() {
    if (this.likesCount > 0) {
      this.likesCount -= 1;
    }
  }
}

module.exports = Post;
`;

// =============================================
// REPOSITORY INTERFACES
// =============================================
// src/core/interfaces/IUserRepository.js
const userRepositoryInterface = `
class IUserRepository {
  async create(userData) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async findByUsername(username) {
    throw new Error('Method not implemented');
  }

  async update(id, userData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll(filters = {}) {
    throw new Error('Method not implemented');
  }

  async updateRole(id, role) {
    throw new Error('Method not implemented');
  }
}

module.exports = IUserRepository;
`;

// src/core/interfaces/IPostRepository.js
const postRepositoryInterface = `
class IPostRepository {
  async create(postData) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByUserId(userId, filters = {}) {
    throw new Error('Method not implemented');
  }

  async findPublic(filters = {}) {
    throw new Error('Method not implemented');
  }

  async update(id, postData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findFeatured() {
    throw new Error('Method not implemented');
  }

  async search(query, filters = {}) {
    throw new Error('Method not implemented');
  }

  async incrementLikes(id) {
    throw new Error('Method not implemented');
  }

  async decrementLikes(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = IPostRepository;
`;

// =============================================
// KNEX REPOSITORY IMPLEMENTATIONS
// =============================================
// src/infrastructure/database/knex/KnexUserRepository.js
const knexUserRepository = `
const IUserRepository = require('../../../core/interfaces/IUserRepository');
const User = require('../../../core/entities/User');

class KnexUserRepository extends IUserRepository {
  constructor(knexInstance) {
    super();
    this.db = knexInstance;
    this.tableName = 'users';
  }

  async create(userData) {
    try {
      const [id] = await this.db(this.tableName)
        .insert({
          ...userData,
          created_at: new Date(),
          updated_at: new Date()
        })
        .returning('id');
      
      return await this.findById(id);
    } catch (error) {
      throw new Error(\`Failed to create user: \${error.message}\`);
    }
  }

  async findById(id) {
    try {
      const userData = await this.db(this.tableName)
        .where('id', id)
        .first();
      
      return userData ? new User(this._mapFromDb(userData)) : null;
    } catch (error) {
      throw new Error(\`Failed to find user by ID: \${error.message}\`);
    }
  }

  async findByEmail(email) {
    try {
      const userData = await this.db(this.tableName)
        .where('email', email)
        .first();
      
      return userData ? new User(this._mapFromDb(userData)) : null;
    } catch (error) {
      throw new Error(\`Failed to find user by email: \${error.message}\`);
    }
  }

  async findByUsername(username) {
    try {
      const userData = await this.db(this.tableName)
        .where('username', username)
        .first();
      
      return userData ? new User(this._mapFromDb(userData)) : null;
    } catch (error) {
      throw new Error(\`Failed to find user by username: \${error.message}\`);
    }
  }

  async update(id, userData) {
    try {
      await this.db(this.tableName)
        .where('id', id)
        .update({
          ...userData,
          updated_at: new Date()
        });
      
      return await this.findById(id);
    } catch (error) {
      throw new Error(\`Failed to update user: \${error.message}\`);
    }
  }

  async delete(id) {
    try {
      const deletedCount = await this.db(this.tableName)
        .where('id', id)
        .del();
      
      return deletedCount > 0;
    } catch (error) {
      throw new Error(\`Failed to delete user: \${error.message}\`);
    }
  }

  async findAll(filters = {}) {
    try {
      let query = this.db(this.tableName);
      
      if (filters.role) {
        query = query.where('role', filters.role);
      }
      
      if (filters.isVerified !== undefined) {
        query = query.where('is_verified', filters.isVerified);
      }
      
      const users = await query.select('*');
      return users.map(userData => new User(this._mapFromDb(userData)));
    } catch (error) {
      throw new Error(\`Failed to find users: \${error.message}\`);
    }
  }

  async updateRole(id, role) {
    try {
      await this.db(this.tableName)
        .where('id', id)
        .update({
          role,
          updated_at: new Date()
        });
      
      return await this.findById(id);
    } catch (error) {
      throw new Error(\`Failed to update user role: \${error.message}\`);
    }
  }

  _mapFromDb(dbData) {
    return {
      id: dbData.id,
      email: dbData.email,
      username: dbData.username,
      password: dbData.password,
      role: dbData.role,
      profile: dbData.profile || {},
      isVerified: dbData.is_verified,
      createdAt: dbData.created_at,
      updatedAt: dbData.updated_at
    };
  }
}

module.exports = KnexUserRepository;
`;

// =============================================
// REPOSITORY FACTORY
// =============================================
// src/infrastructure/database/factory/RepositoryFactory.js
const repositoryFactory = `
const KnexUserRepository = require('../knex/KnexUserRepository');
const KnexPostRepository = require('../knex/KnexPostRepository');
const KnexWishlistRepository = require('../knex/KnexWishlistRepository');
const KnexGroupRepository = require('../knex/KnexGroupRepository');

class RepositoryFactory {
  constructor(dbConnection, dbType = 'knex') {
    this.db = dbConnection;
    this.dbType = dbType;
  }

  createUserRepository() {
    switch (this.dbType) {
      case 'knex':
        return new KnexUserRepository(this.db);
      // Future implementations:
      // case 'mongoose':
      //   return new MongooseUserRepository(this.db);
      // case 'prisma':
      //   return new PrismaUserRepository(this.db);
      default:
        throw new Error(\`Unsupported database type: \${this.dbType}\`);
    }
  }

  createPostRepository() {
    switch (this.dbType) {
      case 'knex':
        return new KnexPostRepository(this.db);
      default:
        throw new Error(\`Unsupported database type: \${this.dbType}\`);
    }
  }

  createWishlistRepository() {
    switch (this.dbType) {
      case 'knex':
        return new KnexWishlistRepository(this.db);
      default:
        throw new Error(\`Unsupported database type: \${this.dbType}\`);
    }
  }

  createGroupRepository() {
    switch (this.dbType) {
      case 'knex':
        return new KnexGroupRepository(this.db);
      default:
        throw new Error(\`Unsupported database type: \${this.dbType}\`);
    }
  }
}

module.exports = RepositoryFactory;
`;

// =============================================
// SERVICES
// =============================================
// src/core/services/UserService.js
const userService = `
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(userData) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const existingUsername = await this.userRepository.findByUsername(userData.username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: userData.role || 'explorer'
    });

    return newUser.toJSON();
  }

  async loginUser(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: user.toJSON(),
      token
    };
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.toJSON();
  }

  async updateUser(id, updateData) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.userRepository.update(id, updateData);
    return updatedUser.toJSON();
  }

  async upgradeToTraveler(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.role !== 'explorer') {
      throw new Error('User is not an explorer');
    }

    const updatedUser = await this.userRepository.updateRole(userId, 'traveler');
    return updatedUser.toJSON();
  }

  async getAllUsers(filters = {}) {
    const users = await this.userRepository.findAll(filters);
    return users.map(user => user.toJSON());
  }
}

module.exports = UserService;
`;

// =============================================
// CONTROLLERS
// =============================================
// src/presentation/controllers/UserController.js
const userController = `
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  register = async (req, res, next) => {
    try {
      const userData = req.body;
      const result = await this.userService.registerUser(userData);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.loginUser(email, password);
      
      res.json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const user = await this.userService.getUserById(userId);
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const updateData = req.body;
      const result = await this.userService.updateUser(userId, updateData);
      
      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  upgradeToTraveler = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const result = await this.userService.upgradeToTraveler(userId);
      
      res.json({
        success: true,
        message: 'Successfully upgraded to Traveler',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
`;

// =============================================
// DATABASE MIGRATIONS
// =============================================
// src/infrastructure/database/knex/migrations/001_create_users.js
const userMigration = `
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.enum('role', ['explorer', 'traveler', 'admin']).defaultTo('explorer');
    table.json('profile').defaultTo('{}');
    table.boolean('is_verified').defaultTo(false);
    table.timestamps(true, true);
    
    table.index(['email']);
    table.index(['username']);
    table.index(['role']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
`;

// src/infrastructure/database/knex/migrations/002_create_posts.js
const postMigration = `
exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.string('destination').notNullable();
    table.text('content').notNullable();
    table.json('images').defaultTo('[]');
    table.json('budget').defaultTo('{}');
    table.json('ratings').defaultTo('{}');
    table.json('tags').defaultTo('[]');
    table.boolean('is_public').defaultTo(true);
    table.boolean('is_featured').defaultTo(false);
    table.integer('likes_count').defaultTo(0);
    table.integer('saves_count').defaultTo(0);
    table.timestamps(true, true);
    
    table.index(['user_id']);
    table.index(['destination']);
    table.index(['is_public']);
    table.index(['is_featured']);
    table.index(['created_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
`;

// =============================================
// APPLICATION SETUP
// =============================================
// src/config/app.js
const appConfig = `
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const databaseConnection = require('./database');
const RepositoryFactory = require('../infrastructure/database/factory/RepositoryFactory');

// Services
const UserService = require('../core/services/UserService');

// Controllers
const UserController = require('../presentation/controllers/UserController');

// Routes
const userRoutes = require('../presentation/routes/userRoutes');

// Middleware
const errorHandler = require('../presentation/middleware/errorHandler');

class App {
  constructor() {
    this.app = express();
    this.db = null;
    this.repositoryFactory = null;
    this.services = {};
    this.controllers = {};
  }

  async initialize() {
    // Connect to database
    this.db = await databaseConnection.connect();
    
    // Initialize repository factory
    this.repositoryFactory = new RepositoryFactory(this.db, 'knex');
    
    // Initialize services
    this.initializeServices();
    
    // Initialize controllers
    this.initializeControllers();
    
    // Setup middleware
    this.setupMiddleware();
    
    // Setup routes
    this.setupRoutes();
    
    // Setup error handling
    this.setupErrorHandling();
    
    return this.app;
  }

  initializeServices() {
    this.services.userService = new UserService(
      this.repositoryFactory.createUserRepository()
    );
  }

  initializeControllers() {
    this.controllers.userController = new UserController(
      this.services.userService
    );
  }

  setupMiddleware() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    // API routes
    this.app.use('/api/users', userRoutes(this.controllers.userController));
  }

  setupErrorHandling() {
    this.app.use(errorHandler);
    
    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    });
  }

  async shutdown() {
    await databaseConnection.disconnect();
  }
}

module.exports = App;
`;

// =============================================
// ROUTES
// =============================================
// src/presentation/routes/userRoutes.js
const