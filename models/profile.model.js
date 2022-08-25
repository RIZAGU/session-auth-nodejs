module.exports = (sequelize, Sequelize) => {
    

    const Profile = sequelize.define("user_profile", {
      profile_id: {
        type: Sequelize.BIGINT, 
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: 'users', 
        referencesKey: 'user_id'
      },
      email: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      verified_account: {
        type: Sequelize.STRING
      },
      verified_otp: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      join_date: {
        type: Sequelize.date
      }
    });
    return Profile;
  }