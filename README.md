# Vongola

Vongola 是一個社交距離APP (Social Distance App)

產品核心功能: 是「會演化的去中心化識別證 (DID)」（Evolvable Decentralize ID in Social App）

### Social APP
Frontend
1. QRcode  (Profile Page) (api)
2. Voting  (Vote Page) -> one topic (contract)
3. Rating  (Rate Page) (api)

Backend
1. GET /create_did 
2. POST /rate_did json {[1,1,1,1,1]}
3. GET /did_result json{[50,50,50,50,50]}