"use strict";
const {Model, Sequelize} = require("sequelize");
module.exports = (sequelize, DataType) => {
    class User extends Model {
        
    }
    User.init(
        {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataType.STRING,
                allowNull: false
            },
            login: {
                type: DataType.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: "User",
            tableName: 'Users'
        }
    )
    return User;
};
