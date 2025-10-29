import mongoose from "mongoose";

mongoose.connect(`mongodb://localhost:27017/pro_2`)
.then(()=>console.log('Mongodb is connect..'))
.catch((error)=>console.log('Failed to connect',error))

export default mongoose;