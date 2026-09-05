const db = require('./config/db');
const fs = require('fs');
const path = require('path');

async function seed() {
  try {
    console.log('Starting MySQL database seeding...');

    // 1. Run Schema
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    // MySQL doesn't support running multiple statements in one query() call by default
    const statements = schema.split(';');
    for (const statement of statements) {
      if (statement.trim()) {
        await db.query(statement);
      }
    }
    console.log('✅ Schema applied');

    // 2. Seed Crops
    const crops = ['Wheat', 'Paddy/Rice', 'Soybean', 'Maize'];
    for (const crop of crops) {
      await db.query('INSERT IGNORE INTO crops (name) VALUES (?)', [crop]);
    }
    console.log('✅ Crops seeded');

    // 3. Seed Centres
    const centres = [
      { name: 'Shivaji Nagar Procurement Centre', loc: 'Main Road', dist: 'Nashik', state: 'Maharashtra', cap: 100 },
      { name: 'Krishi Seva Kendra', loc: 'Market Yard', dist: 'Nashik', state: 'Maharashtra', cap: 80 },
      { name: 'Taluka Grain Procurement Centre', loc: 'Taluka Office', dist: 'Nashik', state: 'Maharashtra', cap: 120 },
      { name: 'APMC Main Centre', loc: 'APMC Yard', dist: 'Nashik', state: 'Maharashtra', cap: 200 },
    ];

    for (const c of centres) {
      await db.query(
        'INSERT INTO procurement_centres (name, location, district, state, daily_capacity) VALUES (?, ?, ?, ?, ?)',
        [c.name, c.loc, c.dist, c.state, c.cap]
      );
    }
    console.log('✅ Centres seeded');

    // 4. Link Crops to Centres (All centres accept all crops for demo)
    const [centreIds] = await db.query('SELECT id FROM procurement_centres');
    const [cropIds] = await db.query('SELECT id FROM crops');
    for (const c of centreIds) {
      for (const cr of cropIds) {
        await db.query('INSERT IGNORE INTO centre_crops (centre_id, crop_id) VALUES (?, ?)', [c.id, cr.id]);
      }
    }

    // 5. Seed Slots for Today
    const today = new Date().toISOString().split('T')[0];
    const timeSlots = [
      { start: '09:00:00', end: '10:00:00' },
      { start: '10:00:00', end: '11:00:00' },
      { start: '11:00:00', end: '12:00:00' },
      { start: '12:00:00', end: '13:00:00' },
    ];

    for (const c of centreIds) {
      for (const ts of timeSlots) {
        await db.query(
          'INSERT IGNORE INTO slots (centre_id, date, start_time, end_time, capacity) VALUES (?, ?, ?, ?, ?)',
          [c.id, today, ts.start, ts.end, 20]
        );
      }
    }
    console.log('✅ Slots seeded');

    // 6. Seed a Demo User
    await db.query('INSERT IGNORE INTO users (phone, password_hash) VALUES (?, ?)', ['9876543210', 'hashed_password']);
    const [userRes] = await db.query('SELECT id FROM users WHERE phone = ?', ['9876543210']);
    const userId = userRes[0].id;
    await db.query('INSERT IGNORE INTO farmer_profiles (user_id, full_name, district, state, preferred_lang) VALUES (?, ?, ?, ?, ?)',
      [userId, 'Ramesh Kumar', 'Nashik', 'Maharashtra', 'mr']);
    console.log('✅ Demo user seeded');

    console.log('\n🚀 MySQL Database seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    process.exit();
  }
}

seed();
