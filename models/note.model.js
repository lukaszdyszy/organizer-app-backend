const mysql = require("mysql2");
const db = require("./db");
const DBError = require("../errors/db.error.js");

class Note {
	constructor(args){
		this.table = 'notes';
		this.id_note = args.id_note || '';
		this.title = args.title || '';
		this.content = args.content || '';
		this.id_user = args.id_user || '';
	}

	add(){
		return new Promise((resolve, reject) => {
			db.execute(
				`INSERT INTO ${this.table} VALUES(null, ?, ?, ?)`,
				[this.title, this.content, this.id_user],
				function(err, result){
					if(err){
						reject(new DBError(err.errno));
					} else {
						resolve();
					}
				}
			)
		})
	}
}

module.exports = Note;