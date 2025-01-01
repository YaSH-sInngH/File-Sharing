import mongoose from 'mongoose';


const DBConnection = async ()=>{
    const MONGODB_URI = 'mongodb://localhost:27017/file-sharing'; 
    try{
        await mongoose.connect(MONGODB_URI,{ useNewUrlParser:true , useUnifiedTopology: true });
        console.log('Database connected Successfully');
        
    }catch(error){
        console.error('Error while connecting database:', error.message);
    }
}

export default DBConnection;