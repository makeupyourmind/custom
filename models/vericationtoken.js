'use strict';
module.exports = (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define('VerificationToken', {
    UserId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  VerificationToken.associate = function(models) {
    // associations can be defined here
    VerificationToken.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "user",
      foreignKeyConstraint: true
    });
  };
  return VerificationToken;
};