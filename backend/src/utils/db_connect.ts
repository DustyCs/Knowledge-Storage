import mongoose from 'mongoose';

const db_connect = (URI: string) => {
    mongoose.connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
}

export default db_connect;