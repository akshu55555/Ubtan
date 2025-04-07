import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const product=(sequelize)=>{
    return sequelize.define('products',{

       prod_id:{

            type:DataTypes.INTEGER,
            primaryKey:true,    
        },
        p_name:{
            type:DataTypes.STRING,
         },
        p_price:{
            type:DataTypes.INTEGER,
        },
        
        dom:{
            type:DataTypes.DATE,
            
        },
        description:{
            type:DataTypes.STRING,
        },
        image:{
            type:DataTypes.STRING,
        }
     },{ 
        timestamps: false,
        tableName: 'products', // Force this exact table name
        freezeTableName: true   // Prevent Sequelize from pluralizing
      })
}
export default product;