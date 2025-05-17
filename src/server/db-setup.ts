// This is a mock database setup file
// In a real-world application, you would use proper database configuration

/**
 * SQL Database Setup (for Authentication)
 * 
 * This would create a users table with:
 * - id (primary key)
 * - email (unique)
 * - password_hash (encrypted password)
 * - created_at
 */

// Mock SQL query to create users table
const createUsersTableSQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Mock insert statement for demo user
const insertDemoUserSQL = `
INSERT OR IGNORE INTO users (email, password_hash)
VALUES ('hdfc@abcd.com', 'encrypted_password_hash_here');
`;

/**
 * NoSQL Database Setup (for Dashboard Data)
 * 
 * In a real application, this might be:
 * - MongoDB collection
 * - Firestore collection
 * - DynamoDB table
 */

// Mock NoSQL document structure
const dashboardItemsCollection = [
  {
    id: '1',
    title: 'Welcome to your Dashboard',
    description: 'This is your first dashboard item. You can view this because you are authenticated.',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Financial Report - Q2 2025',
    description: 'Quarterly financial summary showing growth trends and projections.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: '3',
    title: 'New Product Launch',
    description: 'Details about upcoming product releases and marketing strategy.',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

// Note: This file is for documentation purposes only and doesn't execute any real database operations