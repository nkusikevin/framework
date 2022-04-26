import { User } from "./models/User";



const user = new User({ name: "John", age: 400 });

user.on("change" , ()=>{
    console.log("User Changed");
    
})


user.set({name:"nkusi"})

console.log(user.userGet("name"));