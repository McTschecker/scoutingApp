import firebase_admin
from firebase_admin import credentials, firestore
import json

cred = credentials.Certificate('../ihot1414scoutingappdemo-firebase-adminsdk-rmssr-77780a1440.json') # from firebase project settings
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://ihot1414scoutingappdemo.firebaseio.com'
})

db = firebase_admin.firestore.client()

# add your collections manually
collection_names = ['matches']
collections = dict()
dict4json = dict()
n_documents = 0
fieldsToBeSaved = ["team","cargoShip", "climbed", "crossedAuto", "droppedCargo", "droppedHP", "matchNumber", "rocket", "rocket1", "rocket2", "rocket3", "startingLevel", "startingPosition", "succesfullCargo", "succesfullHP", "userID", "comments"]
for collection in collection_names:
    collections[collection] = db.collection(collection).get()
    dict4json[collection] = {}
    for document in collections[collection]:
        docdict = document.to_dict()
        # print(docdict)
        dict4json[collection][document.id] = {}
        for element in fieldsToBeSaved:
            print(docdict[element])
            dict4json[collection][document.id][element] = docdict[element]
            n_documents += 1

jsonfromdict = json.dumps(dict4json)

path_filename = "firestore.json"
print( "Downloaded %d collections, %d documents and now writing %d json characters to %s" % ( len(collection_names), n_documents, len(jsonfromdict), path_filename ))
with open(path_filename, 'w') as the_file:
    the_file.write(jsonfromdict)