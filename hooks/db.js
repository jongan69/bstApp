import { MongoClient } from 'mongodb';
import { MONGODB_URI } from "@env";

export async function connectToDatabase() {
	const client = await MongoClient.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return client;
}
