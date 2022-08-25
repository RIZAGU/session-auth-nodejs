module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("user_activity", {
      activity_id: {
        type: Sequelize.BIGINT, 
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: 'users', 
        referencesKey: 'user_id'
      },
      date_login: {
        type: Sequelize.DATE
      },
      date_logout: {
        type: Sequelize.DATE
      }
    });
    return Activity;
  }