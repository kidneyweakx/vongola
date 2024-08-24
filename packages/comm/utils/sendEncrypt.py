from didcomm.message import Message
from didcomm.pack_encrypted import pack_encrypted, PackEncryptedConfig
from didcomm.common.resolvers import ResolversConfig
from utils import DIDResolverPeerDID
import uuid

class sendMessage:
    async def sendEncrypt(fromDID, toDID, message, secrets_resolver):
        message = Message(
          body = {"msg": message},
          id = "unique-id-"+str(uuid.uuid4()),
          type = "my-protocol/1.0",
          frm = fromDID,
          to = [toDID]
        )
        packed_msg = await pack_encrypted(
          resolvers_config = ResolversConfig(
              secrets_resolver = secrets_resolver,
              did_resolver = DIDResolverPeerDID()
          ),
          message = message,
          frm = fromDID,
          to = toDID,
          sign_frm = None,
          pack_config = PackEncryptedConfig(protect_sender_id=False)
        )
        return packed_msg