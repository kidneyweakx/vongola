import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { useAccount } from "wagmi";

export function InviteQRCode() {

    const [qr, setQr] = useState<string>("")
    const address = useAccount()

    useEffect(() => {
      if(address.address) {
          generateQRCode(`http://localhost:5173/rate/${address.address}`)
      }
  }, [address.isConnected])

    async function generateQRCode(url: string) {
        try {
          // Generate the QR code as a data URL (base64 string)
          const qrCodeDataUrl = await QRCode.toDataURL(url);
          console.log(qrCodeDataUrl)
          setQr(qrCodeDataUrl)

        } catch (error) {
          console.error('Error generating QR code:', error);
          return ""
        }
    }
    
    return (
        <div>
            {qr != "" &&<img className='w-[150px]' src={qr} />}
        </div>
    )
}
