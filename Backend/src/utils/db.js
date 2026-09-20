import dns from 'node:dns';
import mongoose from 'mongoose';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB=async()=>{
	try{
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("database is connected sucessfully");
	}catch(err){
		console.log(err);
		
	}
	
	
}

export default connectDB;