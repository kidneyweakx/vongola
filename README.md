# Vongola: Evolvable Decentralized Identity (DID) for Social Apps

Vongola is a decentralized identity system that evolves over time, designed for use in social apps. The core idea is to start with a basic psychological test, which users can extend through mutual evaluations using the DIDComm protocol. These evaluations help create an independent DID for each user. A large language model (LLM) then groups users into 10 different categories based on these evaluations.

All of the data, including the DID and historical information, is securely stored on the blockchain. Users can vote within their groups, allowing them to participate in discussions or decisions with a unique social persona—a persona verified and recognized by the community.

This system allows people to engage in discussions across different social settings and topics while presenting different aspects of their personality. For example, an introverted person who actively participates in voting during an outdoor event might receive additional influence or weight to their votes.

In summary, Vongola provides a way for users to showcase different sides of their personality in various social contexts, all within a secure and decentralized framework.

### Social APP
Frontend
1. QRcode  (Profile Page) (api)
2. Voting  (Vote Page) -> one topic (contract)
3. Rating  (Rate Page) (api)

Backend
1. GET /create_did 
2. POST /rate_did json {[1,1,1,1,1]}
3. GET /did_result json{[50,50,50,50,50]}

# Deployed Contract
- Linea Sepolia: [0xe3a6b8Da8932354592E7F3f6199b82D6E2bdBDb2](https://sepolia.lineascan.build/address/0xe3a6b8Da8932354592E7F3f6199b82D6E2bdBDb2#code)
- Scroll Sepolia: [0xacCe510e129a9c9E07EC496c923D3beFBDF9E551](https://sepolia.scrollscan.com/address/0xacCe510e129a9c9E07EC496c923D3beFBDF9E551#code)
- Nero Testnet: [0x71Fc3BE4B619Fd7c279C037eA0Ee09C475175d11](https://testnetscan.nerochain.io/address/0x71Fc3BE4B619Fd7c279C037eA0Ee09C475175d11/contracts#address-tabs)