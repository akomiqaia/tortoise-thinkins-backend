const db = require('./connection');
const path = require('path');
const fs  = require('fs');

const initPath = path.join(__dirname, 'schema.sql');
const initSql = fs.readFileSync(initPath, 'utf-8');

function build() {
  return db.query(initSql);
};

module.exports = build;