import json
import asyncio
from didcomm.message import Message
from didcomm.secrets.secrets_resolver_demo import SecretsResolverDemo
from didcomm.unpack import unpack
from didcomm.common.resolvers import ResolversConfig
from didcomm.pack_encrypted import pack_encrypted, PackEncryptedConfig

from utils import DIDResolverPeerDID, DIDCreatePeerDID

secrets_resolver = SecretsResolverDemo()

async def main():
  alice_did = await DIDCreatePeerDID.create_simple_peer_did(secrets_resolver)
  print("Alice's DID:", alice_did)
  bob_did = await DIDCreatePeerDID.create_simple_peer_did(secrets_resolver)
  print("Bob's DID:", bob_did)
  message = Message(
    body = {"msg": "Hello World"},
    id = "unique-id-24160d23ed1d",
    type = "my-protocol/1.0",
    frm = alice_did,
    to = [bob_did]
  )
  packed_msg = await pack_encrypted(
    resolvers_config = ResolversConfig(
        secrets_resolver = secrets_resolver,
        did_resolver = DIDResolverPeerDID()
    ),
    message = message,
    frm = alice_did,
    to = bob_did,
    sign_frm = None,
    pack_config = PackEncryptedConfig(protect_sender_id=False)
  )
  print(packed_msg.packed_msg[:200]+"...")

  unpack_msg = await unpack(
    resolvers_config=ResolversConfig(
        secrets_resolver=secrets_resolver,
        did_resolver=DIDResolverPeerDID()
    ),
    packed_msg=packed_msg.packed_msg
  )
  print(unpack_msg.message.body["msg"])

if __name__ == "__main__":
  asyncio.run(main())