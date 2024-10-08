from typing import Union
from didcomm.secrets.secrets_resolver_demo import SecretsResolverDemo

from fastapi import FastAPI
from utils import DIDCreatePeerDID,sendMessage
from peewee import SqliteDatabase, Model, CharField, DateTimeField, IntegerField
import datetime
import json
from ai.prompts import PersonalityRatingPrompt
from fastapi.middleware.cors import CORSMiddleware
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
    rating_count= IntegerField(default=0)
    voting_count= IntegerField(default=0)
    group = CharField(default="0")
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = db  

class Vote(Model):
    vote_id = CharField(unique=True)
    vote = IntegerField(default=0)
    name = CharField(default="")
    description = CharField(default="")
    class Meta:
        database = db
db.create_tables([User, Vote])



# @app.get("/")
# async def read_root():
#     did = await DIDCreatePeerDID.create_simple_peer_did(secrets_resolver)
#     return {"did": did}
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/create_vote")
async def create_vote(vote_id, name, description):
    try:
        vote = Vote.create(vote_id=vote_id, name=name, description=description)
    except:
        return {"error": "Vote already exists"}
    return {"vote_id": vote.vote_id}

@app.get("/get_votes")
async def get_votes():
    votes = Vote.select()
    return {"votes": [{ "id": vote.vote_id, "count":vote.vote, "description" : vote.description, "name": vote.name} for vote in votes]}

@app.get("/add_vote_count")
async def add_vote(user, vote_id):
    user = User.get(User.username == user)
    user.voting_count = user.voting_count + 1
    user.save()

    try:
        vote = Vote.create(vote_id=vote_id)
    except:
        vote = Vote.get(Vote.vote_id == vote_id)
    vote.vote = vote.vote + 1
    vote.save()
    return {"voting_count": user.voting_count}

@app.get("/get_vote_count")
async def get_vote(user):
    user = User.get(User.username == user)
    return {"voting_count": user.voting_count}

@app.get("/get_rating_count")
async def add_rating(user):
    user = User.get(User.username == user)
    return {"rating_count": user.rating_count}

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
    fromUser.rating_count = fromUser.rating_count + 1
    fromUser.save()
    return {"message": f"Rating updated {touser.rating}"}

@app.get('/get_rating')
async def get_rating(user):
    user = User.get(User.username == user)
    return {"rating": user.rating}

@app.get('/get_all_msgs')
async def get_all_msgs(user):
    user = User.get(User.username == user)
    return {"msgs": user.msgs}

@app.get('/get_user_group')
async def get_user_group(user):
    user = User.get(User.username == user)
    ans = PersonalityRatingPrompt.gen_ai(PersonalityRatingPrompt.get_prompt()+user.rating)
    return {"group": ans}