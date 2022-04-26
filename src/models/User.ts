import { AxiosResponse } from "axios";
import {Eventing}  from "./Eventing"
import { Sync } from "./Sync";
import { Atrributes } from "./Attributes";
export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}


const rootUrl = "http://localhost:3000/users";

export class User {

	public events : Eventing = new Eventing()

	public sync : Sync<UserProps> = new Sync<UserProps>(rootUrl)

	public attributes : Atrributes<UserProps>

	constructor(attrs : UserProps){
		this.attributes = new Atrributes<UserProps>(attrs)
	}

	get on (){
		return this.events.on
	}

	get userGet (){
		return this.attributes.get
	}


	set(update:UserProps){
		this.attributes.set(update)
		this.events.trigger("change")
	}


	fetch():void{
		const id = this.attributes.get('id')

		if (typeof id !== "number") {
			throw new Error("Cannot fetch without an id")
		}

		this.sync.fetch(id).then((res:AxiosResponse)=>{
			this.set(res.data)
		})
	}

	save ():void{
		
	}

}
