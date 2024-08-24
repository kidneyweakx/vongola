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
import json

class DIDResolverPeerDID(DIDResolver):
    async def resolve(self, did: DID) -> DIDDoc:
        did_doc_json = peer_did.resolve_peer_did(did, format = VerificationMaterialFormatPeerDID.JWK)
        did_doc = DIDDocPeerDID.from_json(did_doc_json)

        return DIDDoc(
            did=did_doc.did,
            key_agreement_kids = did_doc.agreement_kids,
            authentication_kids = did_doc.auth_kids,
            verification_methods = [
                VerificationMethod(
                    id = m.id,
                    type = VerificationMethodType.JSON_WEB_KEY_2020,
                    controller = m.controller,
                    verification_material = VerificationMaterial(
                        format = VerificationMaterialFormat.JWK,
                        value = json.dumps(m.ver_material.value)
                    )
                )
                for m in did_doc.authentication + did_doc.key_agreement
            ],
            didcomm_services = [
                DIDCommService(
                    id = s.id,
                    service_endpoint = s.service_endpoint,
                    routing_keys = s.routing_keys,
                    accept = s.accept
                )
                for s in did_doc.service
                if isinstance(s, DIDCommServicePeerDID)
            ] if did_doc.service else []
        )
    