
export class Atrributes<T> {
	constructor(public data: T) {}

	get(PropName: string): number | string {
		return this.data[PropName];
	}

	set(update: T): void {
		Object.assign(this.data, update);
	}
}