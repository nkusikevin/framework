interface UserProps {
	name?: string;
	age?: number;
}

type Callback = () => void;

export class User {
	events: { [key: string]: Callback[] } = {};

	constructor(public data: UserProps) {}

	get(PropName: string): number | string {
		return this.data[PropName];
	}

	set(update: UserProps): void {
		Object.assign(this.data, update);
	}

	on(eventName: string, callback: Callback) {
		const handlers = this.events[eventName] || [];
		handlers.push(callback);
		this.events[eventName] = handlers;
	}
}
