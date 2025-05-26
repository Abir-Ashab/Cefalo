# Travel Platform - Architecture & Database Design

## Backend Folder Structure (Express.js)

```
travel-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── cloudinary.js
│   │   ├── email.js
│   │   └── index.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   ├── wishlist.controller.js
│   │   ├── group.controller.js
│   │   ├── admin.controller.js
│   │   ├── search.controller.js
│   │   └── analytics.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── upload.middleware.js
│   │   ├── rateLimiter.middleware.js
│   │   ├── error.middleware.js
│   │   └── logger.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Wishlist.js
│   │   ├── Group.js
│   │   ├── Like.js
│   │   ├── Comment.js
│   │   ├── SavedPost.js
│   │   ├── Notification.js
│   │   ├── Report.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── post.routes.js
│   │   ├── wishlist.routes.js
│   │   ├── group.routes.js
│   │   ├── admin.routes.js
│   │   ├── search.routes.js
│   │   └── index.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── email.service.js
│   │   ├── upload.service.js
│   │   ├── notification.service.js
│   │   ├── search.service.js
│   │   ├── analytics.service.js
│   │   ├── ai.service.js
│   │   └── matching.service.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   ├── validators.js
│   │   ├── logger.js
│   │   ├── encryption.js
│   │   └── apiResponse.js
│   ├── jobs/
│   │   ├── emailQueue.js
│   │   ├── analyticsQueue.js
│   │   ├── notificationQueue.js
│   │   └── cleanupQueue.js
│   ├── seeders/
│   │   ├── admin.seeder.js
│   │   ├── categories.seeder.js
│   │   └── demo.seeder.js
│   └── app.js
├── tests/
│   ├── unit/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   └── routes/
│   └── fixtures/
├── uploads/
│   ├── profiles/
│   ├── posts/
│   └── temp/
├── logs/
├── .env.example
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Frontend Folder Structure (React)

```
travel-frontend/
├── public/
│   ├── icons/
│   ├── images/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Header.module.css
│   │   │   │   └── index.js
│   │   │   ├── Footer/
│   │   │   ├── Modal/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Loading/
│   │   │   ├── ErrorBoundary/
│   │   │   └── ProtectedRoute/
│   │   ├── auth/
│   │   │   ├── LoginForm/
│   │   │   ├── RegisterForm/
│   │   │   ├── ForgotPassword/
│   │   │   └── SocialLogin/
│   │   ├── posts/
│   │   │   ├── PostCard/
│   │   │   ├── PostDetail/
│   │   │   ├── PostEditor/
│   │   │   ├── PostFilters/
│   │   │   └── PostList/
│   │   ├── wishlist/
│   │   │   ├── WishlistCard/
│   │   │   ├── WishlistModal/
│   │   │   └── WishlistManager/
│   │   ├── groups/
│   │   │   ├── GroupCard/
│   │   │   ├── GroupChat/
│   │   │   ├── GroupPlanning/
│   │   │   └── GroupInvite/
│   │   ├── profile/
│   │   │   ├── ProfileCard/
│   │   │   ├── ProfileEditor/
│   │   │   ├── TravelStats/
│   │   │   └── AccountSettings/
│   │   ├── admin/
│   │   │   ├── Dashboard/
│   │   │   ├── UserManagement/
│   │   │   ├── ContentModeration/
│   │   │   └── Analytics/
│   │   └── layout/
│   │       ├── Sidebar/
│   │       ├── Navigation/
│   │       └── Breadcrumb/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Explore/
│   │   ├── PostDetail/
│   │   ├── CreatePost/
│   │   ├── Profile/
│   │   ├── Wishlist/
│   │   ├── Groups/
│   │   ├── Search/
│   │   ├── Settings/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ForgotPassword.jsx
│   │   └── NotFound/
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   ├── useInfiniteScroll.js
│   │   ├── useGeolocation.js
│   │   └── useSocket.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   ├── NotificationContext.js
│   │   └── SocketContext.js
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── post.service.js
│   │   ├── user.service.js
│   │   ├── wishlist.service.js
│   │   ├── group.service.js
│   │   ├── upload.service.js
│   │   └── notification.service.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── storage.js
│   │   └── analytics.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   ├── components.css
│   │   └── utilities.css
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── postsSlice.js
│   │   │   ├── userSlice.js
│   │   │   └── uiSlice.js
│   │   └── store.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env.example
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Database Design (Entity Relationship Diagram)

### Core Entities & Relationships

#### **Users Table**
```sql
users {
  id: UUID PRIMARY KEY
  email: VARCHAR UNIQUE NOT NULL
  password_hash: VARCHAR NOT NULL
  username: VARCHAR UNIQUE NOT NULL
  first_name: VARCHAR
  last_name: VARCHAR
  avatar_url: VARCHAR
  bio: TEXT
  role: ENUM('explorer', 'traveler', 'admin') DEFAULT 'explorer'
  is_verified: BOOLEAN DEFAULT false
  travel_style: JSON -- preferences object
  budget_range: ENUM('budget', 'mid-range', 'luxury')
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
  last_login: TIMESTAMP
}
```

#### **Posts Table**
```sql
posts {
  id: UUID PRIMARY KEY
  user_id: UUID FOREIGN KEY -> users.id
  title: VARCHAR NOT NULL
  description: TEXT
  destination: VARCHAR NOT NULL
  country: VARCHAR NOT NULL
  latitude: DECIMAL
  longitude: DECIMAL
  travel_dates_start: DATE
  travel_dates_end: DATE
  total_cost: DECIMAL
  currency: VARCHAR(3)
  physical_effort: INTEGER(1-5)
  time_investment: INTEGER -- days
  travel_style: ENUM('solo', 'couple', 'family', 'group', 'business')
  status: ENUM('draft', 'published', 'featured', 'archived') DEFAULT 'published'
  is_public: BOOLEAN DEFAULT true
  view_count: INTEGER DEFAULT 0
  like_count: INTEGER DEFAULT 0
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### **Post Sections Table**
```sql
post_sections {
  id: UUID PRIMARY KEY
  post_id: UUID FOREIGN KEY -> posts.id
  section_type: ENUM('transport', 'accommodation', 'food', 'attraction', 'general')
  title: VARCHAR
  content: TEXT
  cost: DECIMAL
  rating: INTEGER(1-5)
  order_index: INTEGER
  created_at: TIMESTAMP
}
```

#### **Media Table**
```sql
media {
  id: UUID PRIMARY KEY
  post_id: UUID FOREIGN KEY -> posts.id
  section_id: UUID FOREIGN KEY -> post_sections.id (nullable)
  file_url: VARCHAR NOT NULL
  file_type: ENUM('image', 'video')
  caption: TEXT
  order_index: INTEGER
  created_at: TIMESTAMP
}
```

#### **Wishlists Table**
```sql
wishlists {
  id: UUID PRIMARY KEY
  user_id: UUID FOREIGN KEY -> users.id
  name: VARCHAR NOT NULL
  description: TEXT
  is_public: BOOLEAN DEFAULT false
  is_collaborative: BOOLEAN DEFAULT false
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### **Wishlist Items Table**
```sql
wishlist_items {
  id: UUID PRIMARY KEY
  wishlist_id: UUID FOREIGN KEY -> wishlists.id
  destination: VARCHAR NOT NULL
  country: VARCHAR NOT NULL
  latitude: DECIMAL
  longitude: DECIMAL
  notes: TEXT
  estimated_budget: DECIMAL
  best_time_to_visit: VARCHAR
  priority: ENUM('low', 'medium', 'high') DEFAULT 'medium'
  added_by: UUID FOREIGN KEY -> users.id
  created_at: TIMESTAMP
}
```

#### **Groups Table**
```sql
groups {
  id: UUID PRIMARY KEY
  name: VARCHAR NOT NULL
  description: TEXT
  creator_id: UUID FOREIGN KEY -> users.id
  destination: VARCHAR
  planned_date_start: DATE
  planned_date_end: DATE
  max_members: INTEGER DEFAULT 10
  is_active: BOOLEAN DEFAULT true
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### **Group Members Table**
```sql
group_members {
  id: UUID PRIMARY KEY
  group_id: UUID FOREIGN KEY -> groups.id
  user_id: UUID FOREIGN KEY -> users.id
  role: ENUM('creator', 'admin', 'member') DEFAULT 'member'
  joined_at: TIMESTAMP
  status: ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending'
}
```

#### **Likes Table**
```sql
likes {
  id: UUID PRIMARY KEY
  user_id: UUID FOREIGN KEY -> users.id
  post_id: UUID FOREIGN KEY -> posts.id
  reaction_type: ENUM('like', 'love', 'wow', 'helpful') DEFAULT 'like'
  created_at: TIMESTAMP
  UNIQUE(user_id, post_id)
}
```

#### **Saved Posts Table**
```sql
saved_posts {
  id: UUID PRIMARY KEY
  user_id: UUID FOREIGN KEY -> users.id
  post_id: UUID FOREIGN KEY -> posts.id
  collection_name: VARCHAR DEFAULT 'default'
  created_at: TIMESTAMP
  UNIQUE(user_id, post_id)
}
```



#### **Reports Table**
```sql
reports {
  id: UUID PRIMARY KEY
  reporter_id: UUID FOREIGN KEY -> users.id
  reported_user_id: UUID FOREIGN KEY -> users.id (nullable)
  reported_post_id: UUID FOREIGN KEY -> posts.id (nullable)

  reason: ENUM('spam', 'inappropriate', 'harassment', 'copyright', 'other')
  description: TEXT
  status: ENUM('pending', 'reviewed', 'resolved', 'dismissed') DEFAULT 'pending'
  reviewed_by: UUID FOREIGN KEY -> users.id (nullable)
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### **Notifications Table**
```sql
notifications {
  id: UUID PRIMARY KEY
  user_id: UUID FOREIGN KEY -> users.id
  type: ENUM('like', 'follow', 'group_invite', 'admin_message')
  title: VARCHAR NOT NULL
  message: TEXT NOT NULL
  related_id: UUID -- generic ID for related entity
  is_read: BOOLEAN DEFAULT false
  created_at: TIMESTAMP
}
```

#### **Analytics Table**
```sql
analytics {
  id: UUID PRIMARY KEY
  event_type: VARCHAR NOT NULL
  user_id: UUID FOREIGN KEY -> users.id (nullable)
  post_id: UUID FOREIGN KEY -> posts.id (nullable)
  metadata: JSON
  ip_address: VARCHAR
  user_agent: TEXT
  created_at: TIMESTAMP
}
```

### Key Relationships

1. **One-to-Many:**
   - Users → Posts (one user can create many posts)
   - Posts → Post Sections (one post can have many sections)
   - Posts → Media (one post can have many media files)
   - Users → Wishlists (one user can have many wishlists)
   - Wishlists → Wishlist Items (one wishlist can have many items)

2. **Many-to-Many:**
   - Users ↔ Posts (through Likes, Saved Posts)
   - Users ↔ Groups (through Group Members)
   - Users ↔ Wishlists (collaborative wishlists)

3. **Self-Referencing:**
   - None in current design

### Indexes for Performance

```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- Post indexes
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_destination ON posts(destination);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_created_at ON posts(created_at);
CREATE INDEX idx_posts_location ON posts(latitude, longitude);

-- Like indexes
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);

-- Wishlist indexes
CREATE INDEX idx_wishlist_items_wishlist_id ON wishlist_items(wishlist_id);
CREATE INDEX idx_wishlist_items_destination ON wishlist_items(destination);

-- Group indexes
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);

-- Analytics indexes
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);
```

**ER Diagram**: https://mermaid.live/view#pako:eNq9WG1P4zgQ_iuRpf3WRaW0Pcg3Drp31fImCne6E1LkJtPUu4kd2U6hy_Lfb-KmzZtTAouuQiLxjO2Zx8-8OM_EFwEQl4A8ZzSUNH7gDv7uZ5PbmfO8ecl-acoCB_9uvhZjKyr9JZUOxJRFzr1FklClHoUMvCVVy6Y4VSA5jcE6d8Gk0l4mbsoi2iqiK6qp9FIZFTINT9qZM1GMAE9jR4qotMBc4CvlDlPeCiRbMAgK4TcluKMlXUHkKb0uzzNLzdMgBO1JysOSSLMYlKZx4vgSqIbAo9omTZNgj9Q4G4mQ8Y305SF_uLme3b16SGYsA9rD_18sOGumy-4YrAJQvmSJZoI3J6BQM07tQl-kXMt1IQjAZzGN0AvcKA3AIhE8rIsQji3c2bNC0KnU-xSAB82ltdA08nyhtMXSVErgfslUxjWEgKxdrhXzcSIsFqK861YhOxuP8RUCEQPXNS7soQl6oVNl5VySziPmN_daMXj0DKpNWcS-Q132Xs5VWOXNJmd30-urbuxKEN86uzbugp-xxNPrBLoRzxfoWtmd7UlWz3ALgERS8bA5jiknIzwP4KkLMjvfLyfn09N3-2wEW59bom3BIqgmJ4OUGa7CtMGD1oLwVz38ezr782L6EXmjmn7b08YejpdEvogiOhfZga7gA9m89deb3k0uuzn9yNQyYs3j_R_zn0GTC8xrTfVs99g4uyk6TRvmqOKZHKWFt2KK1TNUIpmQTK9rjtMgyFZdV7zuwKk_bq_vbzp3C115Y9Ywewr5pqMwtSGJKOdobPZiLR4VhUrx2IZYTJ-8GOI5SHvGpv4Hc9Xg6F1OLn_v0HyZsVCKNLGmIVvkWpqewqpvgvGayY2StbP0Yvp18v4Msr9oIHa2qtGBh7PTvybn3q91Ra22FQEeRXmKrzH5dQNvJzfXtx2Nk5Bg79FiYC4MvFYXdhr7cFblsGmPRGvrku-StSdvSRodQ-Hq-m76ZXp22r0JaSV89-YDrVK03L_nPkbGRhZYswD6F7yJBKdXpxf_3E3Pul-vVtgR1aLh7fw1N5gYNEXEaXMTlniY_iUiUAPFbIKodOsxd15--uTcZsAhkdSSJap8rfz58_Nn8ZxfX9x8DZtG0ay4jnjkNpW89uxbZZOsXCfEbG2Tl9OG6yhq19rGrpuHlk2nytpM04eWTQsWoGHAQbYYX60JrknT-6DK-xw3K-aqelEswV70965puelu0Yrqph12Hby9W6RbXKteVlSa0CJVbIp1dNv0yrDhPcv_ngUmt19dak4UftY74TYI6zNyrrWcjAHpFeLssiXpkRhkTFlAXGLywAPRS8B6Qlx8DGBB00g_kAf-gqo01WK25j5xtUyhR7Dqh0viLmik8G2TRPPPN1uVhPJ_hdi9QsCwjbrcfOsxn3yMCnGfyRNxj8bDg-NR__C3o_7o8GR4Mu6RNXGHg4Px8fDkeNAfDA-P-v3x6KVHfphF-wcng9Ho-HDcHw3GOGl0gkZhEwXyLOt_iTsaHvVIKDP3MgNe_gMl96TG