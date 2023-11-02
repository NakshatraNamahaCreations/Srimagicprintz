const Instalationmongoose = require("mongoose");

const Schema = Instalationmongoose.Schema({ InstalationGroup: Array });
module.exports = Instalationmongoose.model("instalations", Schema);
