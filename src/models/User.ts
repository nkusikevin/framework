import axios, { AxiosResponse } from "axios";
interface UserProps {
	id?: number;
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

	trigger(eventName: string): void {
		const handlers = this.events[eventName];
		if (!handlers || handlers.length === 0) {
			return;
		}

		handlers.forEach((callback) => {
			callback();
		});
	}

	fetch(): void {
		axios
			.get(`http://localhost:3000/users/${this.get("id")}`)
			.then((res: AxiosResponse): void => {
				this.set(res.data);
			});
	}

	save(): void {
		const id = this.get("id");
		if (id) {
			//put
			axios.put(`http://localhost:3000/users/${id}`, this.data);
		} else {
			axios.post(`http://localhost:3000/users`, this.data);
		}
	}
}
