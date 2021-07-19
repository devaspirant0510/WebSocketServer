module.exports  = (sequelize,DataTypes)=>{
    return sequelize.define("Chat",{
        message:{
            type:DataTypes.TEXT,
            allowNull:false,
        }
    },{
        timestamps:true
    });
}
