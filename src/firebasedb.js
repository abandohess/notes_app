import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBVB5RoT7oWRNor23fXc_ik8id_A-7cS08',
  authDomain: 'notesapp-f26bc.d.com',
  databaseURL: 'https://notesapp-f26bc.firebaseio.com',
  projectId: 'notesapp-f26bc',
  storageBucket: '',
  messagingSenderId: '57821082316',

  rules: {
    '.read': true,
    '.write': true,
  },
};

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function addNote(note, callback) {
  database.ref().child('notes').push(note);
}

export function removeNote(id, callback) {
  database.ref().child(`notes/${id}`).remove();
}

export function clear(callback) {
  database.ref().child('notes').remove();
}
