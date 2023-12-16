const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uId: {
      type: String,
    },

    displayname: {
      type: String,
    },
    contactno: {
      type: String,
    },
    loginnameOrEmail: {
      type: String,
    },
    password: {
      type: String,
    },
    oldPassword: {
      type: String,
    },
    newPassword: {
      type: String,
    },
    newConfirmPassword: {
      type: String,
    },
    home: {
      type: Boolean,
    },

    categoryMamgement: {
      type: Boolean,
    },
    vendor: {
      type: Boolean,
    },
    client: {
      type: Boolean,
    },
    jobmangement: {
      type: Boolean,
    },
    Recce: {
      type: Boolean,
    },
    Design: {
      type: Boolean,
    },

    printing: {
      type: Boolean,
    },
    fabrication: {
      type: Boolean,
    },
    installation: {
      type: Boolean,
    },

    marketing: {
      type: Boolean,
    },
    trackjob: {
      type: Boolean,
    },
    reports: {
      type: Boolean,
    },
    billing: {
      type: Boolean,
    },
    reports: {
      type: Boolean,
    },
    primages: { type: String },
  },
  {
    timestamps: true,
  }
);

const usermodel = mongoose.model("masteruser", userSchema);
module.exports = usermodel;
