import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
	set(value: T): void;
	get<K extends keyof T>(key: T): T[K];
}

interface Sync<T> {
	fetch(id: number): AxiosPromise;
	save(data: T): AxiosPromise;
}

interface Events {
	on(eventName: string, callback: () => void): void;
	trigger(eventName: string): void;
}

interface HasId {
	id?: number;
}

export class Model<T extends HasId> {
	constructor(
		private attributes: ModelAttributes<T>,
		private sync: Sync<T>,
		private events: Events
	) {}

	get on() {
		return this.events.on;
	}

	get userGet() {
		return this.attributes.get;
	}

	set(update: T) {
		this.attributes.set(update);
		this.events.trigger("change");
	}

	fetch(): void {
		const id = this.userGet("id");

		if (typeof id !== "number") {
			throw new Error("Cannot fetch without an id");
		}

		this.sync.fetch(id).then((res: AxiosResponse) => {
			this.set(res.data);
		});
	}

	save(): void {
		this.sync
			.save(this.attributes.getAll())
			.then((res: AxiosResponse): void => {
				this.events.trigger("save");
			})
			.catch(() => {
				this.events.trigger("error");
			});
	}
}
