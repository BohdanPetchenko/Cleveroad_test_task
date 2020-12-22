var { registrationUser } = require('./registration');
var { loginUser } = require('./login');
var { getCurrentUser } = require('./get-current-user');
var { createItem } = require('./create-item');
var { getItemsList } = require('./get-items-list');
var { getItemById } = require('./get-item-by-id');
var { updateItem } = require('./update-item');
var { deleteItem } = require('./delete-item');
var { uploadFile } = require('./upload-file');


module.exports = {
    registrationUser,
    loginUser,
    getCurrentUser,
    createItem,
    getItemsList,
    getItemById,
    updateItem,
    deleteItem,
    uploadFile   
}