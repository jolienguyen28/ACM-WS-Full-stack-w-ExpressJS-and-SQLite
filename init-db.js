const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('db.db');

const initSql = fs.readFileSync('mysql.sql', 'utf8');

db.serialize(() => {
  db.exec(initSql, (err) => {
    if (err) {
      console.error('Error initializing database', err);
    } else {
      console.log('Database initialized successfully');
    }
  });
});

db.close();
