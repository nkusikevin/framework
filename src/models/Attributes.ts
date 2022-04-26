export class Atrributes<T> {
	constructor(public data: T) {}

	get = <K extends keyof T>(key: K): T[K] => {
		return this.data[key];
	};

	set(update: T): void {
		Object.assign(this.data, update);
	}

	getAll(): T {
		return this.data;
	}
}
