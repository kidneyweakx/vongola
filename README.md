<div align="center">
<h1>Vongola</h1>

<p> Evolvable Decentralized Identity (DID) for Social Apps</p>

<img src="./vongola.png" width="50%" height="50%"></img>

[![](https://img.shields.io/github/license/kidneyweakx/vongola
)](./LICENSE)
</div>

### **ShowCase**
- Website: https://vongola.pages.dev
- Linea Sepolia: [0xe3a6b8Da8932354592E7F3f6199b82D6E2bdBDb2](https://sepolia.lineascan.build/address/0xe3a6b8Da8932354592E7F3f6199b82D6E2bdBDb2#code)
- Scroll Sepolia: [0xacCe510e129a9c9E07EC496c923D3beFBDF9E551](https://sepolia.scrollscan.com/address/0xacCe510e129a9c9E07EC496c923D3beFBDF9E551#code)
- Nero Testnet: [0x71Fc3BE4B619Fd7c279C037eA0Ee09C475175d11](https://testnetscan.nerochain.io/address/0x71Fc3BE4B619Fd7c279C037eA0Ee09C475175d11/contracts#address-tabs)

### **What is Vongola?**

Vongola is a decentralized identity (DID) system designed for social apps, evolving over time. The core idea begins with a basic psychological test (e.g., MBTI). Users can evaluate each other through the DIDComm protocol (https://identity.foundation/didcomm-messaging/spec/). These evaluations help create a unique, decentralized identity for each user. 

Using a large language model (LLM), users are then grouped into 10 categories based on multiple dimensions. All data, including DIDs and historical information, is securely stored on the blockchain and encrypted. Only the user can decrypt their identity, while group voting enables users to engage in discussions or decisions with a unique social persona. This persona, verified and recognized by the community, may change after each social interaction.

The system allows users to express different aspects of their personality in various social contexts. For example, an introverted person who actively votes in an outdoor activity might have their vote carry more weight. Conversely, an extrovert contributing to solitary challenges can demonstrate the tool’s value.

Overall, Vongola provides a way for users to showcase multiple facets of their personality in different social scenarios, all within a secure and decentralized framework.

---

### **Problem Statement**

- Current psychological tests cannot fully represent an individual's social media profile. 
- Most social media platforms lack interactive ways to evaluate others. 
- Additionally, most DID products are not peer-to-peer (P2P).

### **Project Solution**

- Use Veramo to generate on-chain DID entities.
- Enable peer evaluations through QR code scanning, turning the psychological test into a viral social feature.
- Securely encrypt and decrypt evaluations using DIDComm and JWM. 

---

**Vongolaとは？**

「Vongola」は、ソーシャルアプリ向けに設計された進化し続ける分散型ID（DID）システムです。ユーザーは、まず基本的な心理テスト（例: MBTI）を受け、その後[DIDCommプロトコル](https://identity.foundation/didcomm-messaging/spec/)を通じて他のユーザーを評価します。これらの評価に基づいて、各ユーザーのために独自の分散型アイデンティティが作成されます。

さらに、大規模言語モデル（LLM）を使用して、ユーザーは複数の次元に基づき10のカテゴリーに分類されます。すべてのデータ（DIDおよび履歴情報を含む）は、ブロックチェーン上に安全に保存され、暗号化されます。このデータはユーザー自身のみが解読でき、グループ内の投票により、ユーザーはユニークなソーシャルパーソナリティを持って議論や意思決定に参加します。このパーソナリティはコミュニティによって検証され、認識されるものであり、各ソーシャルインタラクションの後に変化する可能性があります。

このシステムを通じて、ユーザーは異なるソーシャルコンテキストで自分のパーソナリティのさまざまな側面を表現することができます。例えば、普段内向的な人がアウトドアイベントで積極的に投票に参加すると、その影響力が増すことがあります。逆に、外向的な人が個別のチャレンジに貢献する場合、このツールの価値が示されるでしょう。

全体として、「Vongola」は安全で分散型の枠組みの中で、ユーザーがさまざまな社会的シチュエーションで自分の多面的なパーソナリティを示すための方法を提供します。
---

**問題点**

現在の心理テストでは、個人のソーシャルメディア上の全体像を完全に表現することができません。多くのソーシャルメディアプラットフォームは、他者を評価するためのインタラクティブな手段が欠けています。また、多くのDID製品はP2P形式ではありません。

**プロジェクトの解決策**

- Veramoを使用して、ブロックチェーン上にDIDエンティティを生成します。
- QRコードスキャンを通じて相互評価を可能にし、心理テストをウイルスのように広がるソーシャル機能に変えます。
- DIDCommとJWMを使用して、他者による評価を安全に暗号化および解読します。

---

### Architecture (Social APP)
**Frontend**
1. QRcode  (Profile Page) (api)
2. Voting  (Vote Page) -> one topic (contract)
3. Rating  (Rate Page) (api)

**Backend**
1. GET /create_did 
2. POST /rate_did json {[1,1,1,1,1]}
3. GET /did_result json{[50,50,50,50,50]}

### Deployed Contract
- Linea Sepolia: [0xe3a6b8Da8932354592E7F3f6199b82D6E2bdBDb2](https://sepolia.lineascan.build/address/0xe3a6b8Da8932354592E7F3f6199b82D6E2bdBDb2#code)
- Scroll Sepolia: [0xacCe510e129a9c9E07EC496c923D3beFBDF9E551](https://sepolia.scrollscan.com/address/0xacCe510e129a9c9E07EC496c923D3beFBDF9E551#code)
- Nero Testnet: [0x71Fc3BE4B619Fd7c279C037eA0Ee09C475175d11](https://testnetscan.nerochain.io/address/0x71Fc3BE4B619Fd7c279C037eA0Ee09C475175d11/contracts#address-tabs)