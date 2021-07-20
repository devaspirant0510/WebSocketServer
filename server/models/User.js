module.exports  = (sequelize,DataTypes)=>{
    return sequelize.define("User",{
        userId:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        userPwd:{
            type:DataTypes.STRING(300),
            allowNull: false
        },
        userName:{
            type:DataTypes.STRING(20),
            allowNull:true,
            unique:true,
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        gender:{
            type:DataTypes.BOOLEAN,
            allowNull:true
        }
    },{
        timestamps:false
    });
}
