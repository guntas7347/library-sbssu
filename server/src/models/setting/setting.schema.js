const { Schema, model, models } = require("mongoose");

const SettingSchema = new Schema({
  group: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
  lastModified: { type: Date, default: Date.now },
});

const Setting = models.Setting || model("Setting", SettingSchema);

module.exports = Setting;
