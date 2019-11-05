import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyCIEe0iPxo-BrzF_jSIp6SNysTvk6OuToY",
	authDomain: "kvis-science-fair.firebaseapp.com",
	databaseURL: "https://kvis-science-fair.firebaseio.com",
	projectId: "kvis-science-fair",
	storageBucket: "kvis-science-fair.appspot.com",
	messagingSenderId: "1088811209397",
	appId: "1:1088811209397:web:df82d84434269a61eee4fc",
	measurementId: "G-3JK8ERPVP0"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();