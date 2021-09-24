class DBError extends Error{
	constructor(errno){
		super();
		switch(errno){
			case 1062:
				this.status = 400;
				this.message = 'Username already exists.';
				break;
			case 1406:
				this.status = 400;
				this.message = 'Too long username (max. 20 signs).';
				break;
			default:
				this.status = 500;
				this.message = 'Something goes wrong';
				break;
		}
	}
}

module.exports = DBError;