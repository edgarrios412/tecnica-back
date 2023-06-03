const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('book', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      defaultValue:"https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
    },
    summary:{
      type: DataTypes.TEXT,
    },
    created:{
      type: DataTypes.STRING,
      defaultValue:"user"
    },
    date:{
      type: DataTypes.STRING,
      defaultValue:"Hoy"
    },
    url:{
      type:DataTypes.STRING,
      defaultValue:null,
      allowNull:true,
    }
  });
};
