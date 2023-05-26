import mongoose from 'mongoose';

// export const __connectToDB = async () => {
//   try {
//     const connectDB = await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: process.env.MONGODB_DATABASE,
//     });
//     // console.log('MongoDB has been connected...');
//     return connectDB;
//   } catch (error) {
//     console.log(`MongoDB could not be connected! ${error}`);
//   }
// };

export const connectToDB = () => {
  let connect;
  if (process.env.MONGODB_URI) {
    connect = mongoose.connect(process.env.MONGODB_URI, {})
      .then(
        () => { console.log('The database is now connected...'); },
        (err) => { console.log(`Can not connect to the database${err}`); },
      );
    mongoose.set('debug', true);
  }
  return connect;
};