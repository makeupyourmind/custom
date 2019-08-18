'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ship = sequelize.define('Ship', {
    name: DataTypes.STRING
  }, {});
  Ship.associate = function(models) {
    Ship.hasMany(models.Member, {
      as: "members",
      onDelete: "set null",
      hooks: true
    });
  };
  return Ship;
};