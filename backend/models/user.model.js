class User {
  static instanceCount = 1;
  constructor(name, email, active = true) {
    this.id = User.instanceCount;
    this.name = name;
    this.email = email;
    this.active = active;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    
    User.instanceCount ++;
  }
}
  
module.exports = User;
  