'use strict';
const mongoose = require('mongoose');

function getModel(modelName) {
    return mongoose.model(modelName);
}

// Get one record
async function getRecord(modelName, query) {
    const Model = getModel(modelName);
    return await Model.findOne(query);
}

// Add record
async function addRecord(modelName, data) {
    const Model = getModel(modelName);
    const record = new Model(data);
    await record.save();
}

// Get all records
async function getAllRecords(modelName, query = {}) {
    const Model = getModel(modelName);
    return await Model.find(query);
}

// Update records
async function updateRecord(modelName, query, newData) {
    const Model = getModel(modelName);
    await Model.updateMany(query, newData);
}

// Delete record
async function deleteRecord(modelName, query) {
    const Model = getModel(modelName);
    await Model.deleteMany(query);
}

module.exports = {
    getRecord,
    addRecord,
    getAllRecords,
    updateRecord,
    deleteRecord,
};
