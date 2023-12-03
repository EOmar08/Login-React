const tokenSchema = {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    token: { type: 'string', notNull: true },
  };

module.exports = {  
    tokenSchema
    } 