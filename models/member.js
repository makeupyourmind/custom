'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    ShipId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    }
  }, {});
  Member.associate = function(models) {
    Member.belongsTo(models.Ship, {
      foreignKey: "ShipId",
      as: "Ship"
    });
  };
  return Member;
};