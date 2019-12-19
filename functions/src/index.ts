import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp();
const adminFirestore = admin.firestore();


async function getEmailByUsername(username: string): Promise<{ email: string }> {
	const userQuery = await adminFirestore.collection('users')
		.where('username', '==', username)
		.get();

	if (userQuery === null || userQuery.size !== 1) {
		throw new functions.https.HttpsError('not-found', 'Multiple (or no) users with the same username found.');
	}

	return { email: userQuery.docs[0].get('email') };
}

exports.getEmailByUsername = functions.https.onCall((data, context) => {
	return getEmailByUsername(data.username);
})
