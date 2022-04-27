import { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Atrributes } from "./Attributes";
export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

const rootUrl = "http://localhost:3000";

export class User {
	public events: Eventing = new Eventing();

	public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

	public attributes: Atrributes<UserProps>;

	constructor(attrs: UserProps) {
		this.attributes = new Atrributes<UserProps>(attrs);
	}

	
}
