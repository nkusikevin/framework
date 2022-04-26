import { User } from "./models/User";



const user = new User({id:1, name: "John k", age: 44 });

user.on("change" , ()=>{
    console.log("User Changed");
    
})


user.save()