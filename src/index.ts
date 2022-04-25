import { User } from "./models/User";


const user  = new User({name:"krvin",age:23})

console.log(user.get("name"))


user.set({ name: "kevin", age: 23 });

console.log(user.get("name"));