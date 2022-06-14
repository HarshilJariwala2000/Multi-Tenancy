module.exports = function (HOST:string, PORT:number, DATABASENAME:string, USERNAME:string, PASSWORD:string) {
  this.HOST = HOST;
  this.PORT = PORT;
  this.DATABASENAME = DATABASENAME;
  this.USERNAME = USERNAME;
  this.PASSWORD = PASSWORD;
  this.MONGO_URI = function () { 
      return `mongodb://${this.HOST}:${this.PORT}/${this.DATABASENAME}?replicaSet=rs0`;
  }
}