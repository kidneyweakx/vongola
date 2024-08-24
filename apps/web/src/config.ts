import { http, createConfig } from 'wagmi'
import { scrollSepolia, lineaSepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [scrollSepolia, lineaSepolia],
  transports: {
    [scrollSepolia.id]: http("https://scroll-sepolia.chainstacklabs.com"),
    [lineaSepolia.id]: http("https://linea-sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"),
  },
})