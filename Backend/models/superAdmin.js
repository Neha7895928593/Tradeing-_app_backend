const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const superAdminSchema = new Schema({
  super_admin_id: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  master_admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MasterAdmin',
    default: [],
  }],




});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
