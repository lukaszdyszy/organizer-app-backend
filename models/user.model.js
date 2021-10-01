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
						reject(new DBError(err.errno));
					} else {
						resolve('User registered');
					}
				}
			)
		})
	}

	login(){
		return new Promise((resolve, reject) => {
			db.execute(
				`SELECT * FROM ${this.table} WHERE username=?`,
				[this.username],
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

	saveRefreshToken(token){
		return new Promise((resolve, reject) => {
			db.execute(
				`UPDATE ${this.table} SET refresh_token=? WHERE username=?`,
				[token, this.username],
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

	getRefreshToken(){
		return new Promise((resolve, reject) => {
			db.execute(
				`SELECT refresh_token FROM ${this.table} WHERE id_user=?`,
				[this.id_user],
				function(err, result){
					if(err){
						console.log(err);
						reject(new DBError(err.errno));
					} else {
						resolve(result);
					}
				}
			)
		})
	}

	deleteRefreshToken(){
		return new Promise((resolve, reject) => {
			db.execute(
				`UPDATE ${this.table} SET refresh_token=null WHERE id_user=?`,
				[this.id_user],
				function(err, result){
					if(err){
						console.log(err);
						reject(new DBError(err.errno));
					} else {
						resolve(result);
					}
				}
			)
		})
	}
}

module.exports = User;