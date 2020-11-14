#clone

#npm install

#add valid .env values in .env file at root of the project

#npm run start

To enable DnD sorting we should use server functions and indexing mechanism.
It's not implemented here.

In case we would need to, first, we would add some firebase "functions" hooks and endpoints.
Then create an endpoint for rearranging indecies of elements in a collection.

Say we have documents with indecies: 1,2,3,4,5,6, etc...
After DnD is complete we would send to server item's id and index that it should get.
Then server should manipulate data in Firestore collection updating all the items with new indecies OR we could have a collection with indecies and refs to documents and manipulate only this table, so  actual data is not updated too often.
