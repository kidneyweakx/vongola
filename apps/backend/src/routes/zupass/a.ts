import { ZKEdDSAEventTicketPCDPackage } from "@pcd/zk-eddsa-event-ticket-pcd";
import { hexToBigInt } from "viem";
import { createWalletClient, http, isAddress, parseEther } from "viem";
import { isETHPraguePublicKey } from "../../lib/pcd"


export default async function a (req, res) {
  const pcd = await ZKEdDSAEventTicketPCDPackage.deserialize(req.body.pcd);
  const address = req.body.address;

  // ## Validations
  if (!isAddress(address)) {
    return res.status(401).send("Invalid address");
  }

  if (!(await ZKEdDSAEventTicketPCDPackage.verify(pcd))) {
    console.error(`[ERROR] ZK ticket PCD is not valid`);

    return res.status(401).send("ZK ticket PCD is not valid");
  }

  if (!isETHPraguePublicKey(pcd.claim.signer)) {
    console.error(`[ERROR] PCD is not signed by Zupass`);

    return res.status(401).send("PCD is not signed by ETHPrague");
  }

  // TODO: Use real nonce generated by the server
  if (pcd.claim.watermark.toString() !== hexToBigInt(address as `0x${string}`).toString()) {
    console.error(`[ERROR] PCD watermark doesn't match`);

    res.status(401).send("PCD watermark doesn't match");
    return;
  }


  return res.status(200).json({ message: `🎉 PCD verified! 1 ETH has been sent to ${address}!` });
}