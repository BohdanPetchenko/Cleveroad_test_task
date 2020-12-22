var createRow = require("./create-row-in-model");

async function initDatabase(db) {
   createRow(db.mistake, { field: 'password', message: 'Wrong email or password' })
   createRow(db.mistake, { field: 'current_password', message: 'Wrong current password' })
   createRow(db.mistake, { field: 'check_user', message: 'User with this login already exists' })
   createRow(db.mistake, { field: 'title_lenght', message: 'Title should contain at least 3 characters' })
   createRow(db.mistake, { field: 'title', message: 'Title is required' })
   createRow(db.mistake, { field: 'image', message: 'The file {file} is too big.' })
}

module.exports = initDatabase