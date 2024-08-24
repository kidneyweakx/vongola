from typing import Union
from didcomm.secrets.secrets_resolver_demo import SecretsResolverDemo

from fastapi import FastAPI
from utils import DIDCreatePeerDID,sendMessage
from peewee import SqliteDatabase, Model, CharField, DateTimeField
import datetime
import json

app = FastAPI()
secrets_resolver = SecretsResolverDemo()

db = SqliteDatabase('users.db')
db.connect()

class User(Model):
    username = CharField(unique=True)
    did = CharField(unique=True)
    # rating is a array length 5, each index represents a rating
    rating = CharField(default=json.dumps([50, 50, 50, 50, 50]))
    msgs = CharField(default=json.dumps([]))
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = db  

db.create_tables([User])


# @app.get("/")
# async def read_root():
#     did = await DIDCreatePeerDID.create_simple_peer_did(secrets_resolver)
#     return {"did": did}

@app.get("/create_peer_did")
async def create_peer_did(user):
    if(User.select().where(User.username == user).exists()):
        return {"error": "User already exists"}
    did = await DIDCreatePeerDID.create_simple_peer_did(secrets_resolver)
    User.create(username=user, did=did)
    return {"did": did}

@app.get('/get_user_did')
async def get_user_did(user):
    user = User.get(User.username == user)
    return {"did": user.did}

@app.post('/rate_did')
async def rate_did(user, to, rating):
    fromUser = User.get(User.username == user)
    touser = User.get(User.username == to)
    ratingArr = json.loads(rating)
    if len(ratingArr) != 5:
        return {"error": "Rating should be of length 5"}
    for i in range(5):
        if int(ratingArr[i]) < 0 or int(ratingArr[i]) > 1:
            return {"error": "Rating should be between 0 and 1"}
    # add rating to the user
    packed_msg = await sendMessage.sendEncrypt(
      fromDID=fromUser.did,
      toDID=touser.did,
      message=rating,
      secrets_resolver=secrets_resolver
    )
    
    msgs = json.loads(touser.msgs)
    print(msgs)
    print("p", json.dumps(packed_msg.packed_msg))
    msgs.append(json.dumps(packed_msg.packed_msg))
    print("====================================")
    print(msgs)
    touser.msgs = json.dumps(msgs)

    oldRating = json.loads(touser.rating)
    for i in range(5):
        if (int(ratingArr[i]) == 0):
            oldRating[i] = (oldRating[i] - 1)
        else:
            oldRating[i] = (oldRating[i] + ratingArr[i])
        if (oldRating[i] >= 100):
            oldRating[i] = 100
    touser.rating = json.dumps(oldRating)
    touser.save()
    return {"message": f"Rating updated {touser.rating}"}

@app.get('/get_rating')
async def get_rating(user):
    user = User.get(User.username == user)
    return {"rating": user.rating}

@app.get('/get_all_msgs')
async def get_all_msgs(user):
    user = User.get(User.username == user)
    return {"msgs": user.msgs}