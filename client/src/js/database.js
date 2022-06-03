import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic added to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Adding to the Database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const storeObj = tx.objectStore('jate');
  const request = storeObj.put({ id: 1, value: content });
  const result = await request;
  console.log('data has been retrieved from the database', result.value);


};

// Logic added for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const storeObj = tx.transaction('jate');
  const request = storeObj.get(1);
  const result = await request;

  // Checking if a variable is defined and if it is, return it.
  result
    ? console.log('data has been retrieved from the database', result.value)
    : console.log('Im sorry, no data has been found in the database');
  return result?.value;
};


initdb();
