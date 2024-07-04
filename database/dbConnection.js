import { connect } from 'mongoose';


export const dbConnection = connect('mongodb://127.0.0.1:27017/liberary').then(()=>{
    console.log('connected to database successfully');
}).catch((err)=>{
    console.log('error in connecting to database',err);
});