'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    } 
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.VerificationToken, {
      as: 'verificationtoken',  
      foreignKey: 'UserId',
      foreignKeyConstraint: true,
      onDelete: 'set null', 
      hooks: true
    });
  };
  return User;
};