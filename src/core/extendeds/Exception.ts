import HttpResponseCode from '../enums/EHttpResponseCode';

export default class Exception extends Error {
	constructor(description: string) {
		super(description);

		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}

export class Api400Exception extends Exception {
	statusCode: number;
	constructor(description = 'Bad Request') {
		super(description);
		this.statusCode = HttpResponseCode.BAD_REQUEST;
	}
}

export class Api404Exception extends Exception {
	statusCode: number;
	constructor(description = 'Not found.') {
		super(description);
		this.statusCode = HttpResponseCode.NOT_FOUND;
	}
}

export class Api500Exception extends Exception {
	statusCode: number;
	constructor(description = 'Internal Server.') {
		super(description);
		this.statusCode = HttpResponseCode.INTERNAL_SERVER;
	}
}
