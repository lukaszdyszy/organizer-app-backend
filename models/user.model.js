const mysql = require("mysql2");
const db = require("./db");

class User {
	constructor(args){
		this.table = 'users';
		this.id_user = args.id_user || '';
		this.username = args.username || '';
		this.password = args.password || '';
	}

	register(){
		db.execute(
			`INSERT INTO ${this.table} VALUES(null, ?, ?)`,
			[this.username, this.password],
			function(err, result){
				if(err) throw err;
				return result;
			}
		)
	}
}

module.exports = User;