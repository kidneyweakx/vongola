import json
import asyncio
from didcomm.secrets.secrets_resolver_demo import SecretsResolverDemo
from didcomm.unpack import unpack
from didcomm.common.resolvers import ResolversConfig
from didcomm.pack_encrypted import pack_encrypted, PackEncryptedConfig

from utils import DIDResolverPeerDID, DIDCreatePeerDID, sendMessage

secrets_resolver = SecretsResolverDemo()

async def main():
  alice_did = await DIDCreatePeerDID.create_simple_peer_did(secrets_resolver)
  print("Alice's DID:", alice_did)
  bob_did = await DIDCreatePeerDID.create_simple_peer_did(secrets_resolver)

  print("Bob's DID:", bob_did)
  packed_msg = await sendMessage.sendEncrypt(
    fromDID=alice_did,
    toDID=bob_did,
    message="{1, 0, 1, 0 , 1}",
    secrets_resolver=secrets_resolver
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