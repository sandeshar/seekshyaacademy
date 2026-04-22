import mongoose from 'mongoose';

// Ensure all models are registered with mongoose to avoid "Schema hasn't been registered" errors
import './notices';
import './notice-categories';
import './notice-subcategories';
import './teachers';
import './teacher-categories';
import './teacher-subcategories';
import './articles';
import './categories';
import './subcategories';
import './footer';
import './student-ranks';
import './student-rank-categories';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
