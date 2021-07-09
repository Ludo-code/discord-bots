const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = class ticket extends Model {
  static init(sequelize) {
    return super.init(
      {
        guildid: {
          type: DataTypes.VARCHAR,
        },
        utilisateurid: {
          type: DataTypes.VARCHAR,
        },
        messageid: {
          type: DataTypes.VARCHAR,
          primaryKey: true,
        },
      },
      {
        tableName: "ticketsystem",
        timestamps: true,
        sequelize,
      }
    );
  }
};
