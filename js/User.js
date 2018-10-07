class User {
	constructor(userName) {
		this._userName = userName;
		Object.freeze(this);
	}

	get userName() {
		return this._userName;
	}
}