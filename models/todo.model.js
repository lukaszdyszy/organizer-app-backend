const mysql = require("mysql2");
const db = require("./db");
const DBError = require("../errors/db.error.js");

class Todo {
	constructor(args){
		this.table = 'todos';
		this.id_todo = args.id_todo || '';
		this.title = args.title || '';
		this.done = args.done || '';
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
				`SELECT * FROM ${this.table} WHERE id_todo=?`,
				[this.id_todo],
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
				`INSERT INTO ${this.table} VALUES(null, ?, 0, ?)`,
				[this.title, this.id_user],
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

	toggleDone(){
		return new Promise((resolve, reject) => {
			db.execute(
				`UPDATE ${this.table} SET done=NOT done WHERE id_todo=?`,
				[this.id_todo],
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

	changeTitle(){
		return new Promise((resolve, reject) => {
			db.execute(
				`UPDATE ${this.table} SET title=? WHERE id_todo=?`,
				[this.title, this.id_todo],
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

	delete(){
		return new Promise((resolve, reject) => {
			db.execute(
				`DELETE FROM ${this.table} WHERE id_todo=?`,
				[this.id_todo],
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
}

module.exports = Todo;