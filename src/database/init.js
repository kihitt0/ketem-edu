const db = require('../config/database');
const bcrypt = require('bcryptjs');

const createTables = async () => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    // Users table (password nullable for OAuth-only users)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('admin', 'student')),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'blocked')),
        phone VARCHAR(50),
        country VARCHAR(100),
        date_of_birth DATE,
        avatar_url TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Courses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
        duration_hours INTEGER,
        price DECIMAL(10, 2) DEFAULT 0,
        thumbnail_url TEXT,
        is_published BOOLEAN DEFAULT false,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Lessons table
    await client.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id SERIAL PRIMARY KEY,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        video_url TEXT,
        order_index INTEGER NOT NULL,
        duration_minutes INTEGER,
        is_free BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Enrollments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP,
        progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
        UNIQUE(user_id, course_id)
      )
    `);

    // Lesson Progress table
    await client.query(`
      CREATE TABLE IF NOT EXISTS lesson_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        completed BOOLEAN DEFAULT false,
        completed_at TIMESTAMP,
        time_spent_minutes INTEGER DEFAULT 0,
        UNIQUE(user_id, lesson_id)
      )
    `);

    // Applications table (заявки на обучение за рубежом)
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        country_preference VARCHAR(100),
        university VARCHAR(255),
        program_type VARCHAR(100),
        education_level VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected', 'completed')),
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add university column if it doesn't exist (for existing databases)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='applications' AND column_name='university') THEN
          ALTER TABLE applications ADD COLUMN university VARCHAR(255);
        END IF;
      END $$;
    `);

    // Password reset tokens table
    await client.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Events table (события/мероприятия)
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date TIMESTAMP NOT NULL,
        event_type VARCHAR(50) DEFAULT 'webinar' CHECK (event_type IN ('webinar', 'open_day', 'consultation', 'other')),
        location VARCHAR(255),
        is_online BOOLEAN DEFAULT true,
        link VARCHAR(500),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index for events
    await client.query('CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active)');

    // Consultations table (записи на консультации)
    await client.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        consultation_date DATE NOT NULL,
        consultation_time VARCHAR(10) NOT NULL,
        topic VARCHAR(100) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON consultations(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_consultations_date ON consultations(consultation_date)');

    // User Documents table (загруженные документы пользователей)
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_documents (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('passport', 'diploma', 'photo', 'motivation_letter', 'recommendation', 'language_certificate', 'other')),
        file_name VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size INTEGER,
        mime_type VARCHAR(100),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_user_documents_type ON user_documents(document_type)');

    // Chat Conversations table (диалоги между пользователями)
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_conversations (
        id SERIAL PRIMARY KEY,
        participant_1 INTEGER REFERENCES users(id) ON DELETE CASCADE,
        participant_2 INTEGER REFERENCES users(id) ON DELETE CASCADE,
        last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(participant_1, participant_2)
      )
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_conversations_p1 ON chat_conversations(participant_1)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_conversations_p2 ON chat_conversations(participant_2)');

    // Chat Messages table (сообщения)
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        conversation_id INTEGER REFERENCES chat_conversations(id) ON DELETE CASCADE,
        sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        reply_to_id INTEGER REFERENCES chat_messages(id) ON DELETE SET NULL,
        is_read BOOLEAN DEFAULT false,
        is_deleted BOOLEAN DEFAULT false,
        deleted_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_messages_conversation ON chat_messages(conversation_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_messages_sender ON chat_messages(sender_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_messages_created ON chat_messages(created_at DESC)');

    // Message Reactions table (реакции на сообщения)
    await client.query(`
      CREATE TABLE IF NOT EXISTS message_reactions (
        id SERIAL PRIMARY KEY,
        message_id INTEGER REFERENCES chat_messages(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        emoji VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(message_id, user_id, emoji)
      )
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_reactions_message ON message_reactions(message_id)');

    // Add google_id column to users if not exists (for OAuth)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='google_id') THEN
          ALTER TABLE users ADD COLUMN google_id VARCHAR(255) UNIQUE;
        END IF;
      END $$;
    `);

    // Add email verification columns to users if not exists
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='email_verified') THEN
          ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='email_verification_token') THEN
          ALTER TABLE users ADD COLUMN email_verification_token VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='email_verification_expires') THEN
          ALTER TABLE users ADD COLUMN email_verification_expires TIMESTAMP;
        END IF;
      END $$;
    `);

    // Add status column to users if not exists (for admin approval flow)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='status') THEN
          ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'blocked'));
          -- Existing admin users should be approved automatically
          UPDATE users SET status = 'approved' WHERE role = 'admin';
        END IF;
      END $$;
    `);

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_reset_tokens_token ON password_reset_tokens(token)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_reset_tokens_user_id ON password_reset_tokens(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status)');

    // Create default admin user if doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ketemedu.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    
    const existingAdmin = await client.query('SELECT id FROM users WHERE email = $1', [adminEmail]);
    
    if (existingAdmin.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await client.query(
        'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4)',
        [adminEmail, hashedPassword, 'System Admin', 'admin']
      );
      console.log('✅ Default admin user created');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
    }

    // Create demo users for testing
    const demoUsers = [
      { email: 'admin@study.com', password: 'admin123', name: 'Demo Admin', role: 'admin' },
      { email: 'student@study.com', password: 'student123', name: 'Demo Student', role: 'student' }
    ];

    for (const demoUser of demoUsers) {
      const existingUser = await client.query('SELECT id FROM users WHERE email = $1', [demoUser.email]);
      if (existingUser.rows.length === 0) {
        const hashedPwd = await bcrypt.hash(demoUser.password, 10);
        await client.query(
          'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4)',
          [demoUser.email, hashedPwd, demoUser.name, demoUser.role]
        );
        console.log(`✅ Demo user created: ${demoUser.email} / ${demoUser.password}`);
      }
    }

    await client.query('COMMIT');
    console.log('✅ Database tables created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const initDatabase = async () => {
  try {
    await createTables();
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

module.exports = { initDatabase };
