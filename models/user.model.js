const mysql = require("mysql2");
const db = require("./db");
const DBError = require("../errors/db.error.js");

class User {
	constructor(args){
		this.table = 'users';
		this.id_user = args.id_user || '';
		this.username = args.username || '';
		this.password = args.password || '';
	}

	register(){
		return new Promise((resolve, reject) => {
			db.execute(
				`INSERT INTO ${this.table} VALUES(null, ?, ?)`,
				[this.username, this.password],
				function(err, result){
					if(err){
						console.log(err);
						reject(new DBError(err.errno));
					} else {
						resolve('User registered');
					}
				}
			)
		})
	}
}

module.exports = User;