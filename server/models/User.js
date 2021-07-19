module.exports  = (sequelize,DataTypes)=>{
    return sequelize.define("User",{
        userId:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        userPwd:{
            type:DataTypes.STRING(300),
            allowNull: false
        },
        userName:{
            type:DataTypes.STRING(20),
            allowNull:true
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
