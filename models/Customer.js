import { DataTypes } from "sequelize";


const customer=(sequelize)=>{
    return sequelize.define('customers',{
        id:{

            type:DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey:true,
        },
        first_name:{
            type:DataTypes.STRING,
         },
        last_name:{
            type:DataTypes.STRING,
        },
        
        contact:{
            type:DataTypes.STRING,
            
        },
        address:{
            type:DataTypes.STRING,
            
        },
 }  ,{ 
    timestamps: true  
  })
}
export default customer;