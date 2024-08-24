from didcomm.common.types import DID, VerificationMethodType, VerificationMaterial, VerificationMaterialFormat
from didcomm.did_doc.did_doc import DIDDoc, VerificationMethod, DIDCommService
from didcomm.did_doc.did_resolver import DIDResolver
from didcomm.message import Message
from didcomm.secrets.secrets_resolver_demo import SecretsResolverDemo
from didcomm.unpack import unpack, UnpackResult
from didcomm.common.resolvers import ResolversConfig
from didcomm.pack_encrypted import pack_encrypted, PackEncryptedConfig, PackEncryptedResult
from didcomm.secrets.secrets_util import generate_x25519_keys_as_jwk_dict, generate_ed25519_keys_as_jwk_dict, jwk_to_secret
from peerdid import peer_did
from peerdid.did_doc import DIDDocPeerDID
from peerdid.types import VerificationMaterialAuthentication, VerificationMethodTypeAuthentication, VerificationMaterialAgreement, VerificationMethodTypeAgreement, VerificationMaterialFormatPeerDID


class DIDCreatePeerDID:
  async def create_simple_peer_did(secret) -> str:
      agreem_keys = generate_x25519_keys_as_jwk_dict()
      auth_keys = generate_ed25519_keys_as_jwk_dict()
      did = peer_did.create_peer_did_numalgo_2(
          [VerificationMaterialAgreement(
                  type = VerificationMethodTypeAgreement.JSON_WEB_KEY_2020,
                  format = VerificationMaterialFormatPeerDID.JWK,
                  value = agreem_keys[1])
          ],
          [VerificationMaterialAuthentication(
                  type = VerificationMethodTypeAuthentication.JSON_WEB_KEY_2020,
                  format = VerificationMaterialFormatPeerDID.JWK,
                  value = auth_keys[1])
          ],
          None
      )
      did_doc = DIDDocPeerDID.from_json(peer_did.resolve_peer_did(did))
      pk = auth_keys[0]
      pk["kid"] = did_doc.auth_kids[0]
      await secret.add_key(jwk_to_secret(pk))
      private_key = agreem_keys[0]
      private_key["kid"] = did_doc.agreement_kids[0]
      await secret.add_key(jwk_to_secret(private_key))

      return did