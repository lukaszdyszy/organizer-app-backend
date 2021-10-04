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

	getAll(){
		return new Promise((resolve, reject) => {
			db.execute(
				`SELECT * FROM ${this.table} WHERE id_user=?`,
				[this.id_user],
				function(err, result){
					if(err){
						reject(new DBError(err.errno));
					} else {
						resolve(result);
					}
				}
			)
		})
	}

	getById(){
		return new Promise((resolve, reject) => {
			db.execute(
				`SELECT * FROM ${this.table} WHERE id_note=?`,
				[this.id_note],
				function(err, result){
					if(err){
						reject(new DBError(err.errno));
					} else {
						resolve(result);
					}
				}
			)
		})
	}

	add(){
		return new Promise((resolve, reject) => {
			db.execute(
				`INSERT INTO ${this.table} VALUES(null, ?, "", ?)`,
				[this.title, this.id_user],
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

	setTitle(){
		return new Promise((resolve, reject) => {
			db.execute(
				`UPDATE ${this.table} SET title=? WHERE id_note=?`,
				[this.title, this.id_note],
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

	setContent(){
		return new Promise((resolve, reject) => {
			db.execute(
				`UPDATE ${this.table} SET content=? WHERE id_note=?`,
				[this.content, this.id_note],
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

	delete(){
		return new Promise((resolve, reject) => {
			db.execute(
				`DELETE FROM ${this.table} WHERE id_note=?`,
				[this.id_note],
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