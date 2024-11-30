interface ApiRequestErrorProps {
	status: number;
	message: string;
}

export class ApiRequestError extends Error {
	private statusCode: number;

	constructor({ status, message }: ApiRequestErrorProps) {
		super(message);

		this.statusCode = status;
	}

	get status() {
		return this.statusCode;
	}
}
