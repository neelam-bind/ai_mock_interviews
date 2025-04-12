# PrepWise – Your Personalized AI Interview Coach

**PrepWise** is a cutting-edge, AI-powered mock interview platform designed to help users prepare for interviews with personalized questions, real-time AI interaction, and blockchain-secured certification. Built with a focus on personalization, real-time experience, and tamper-proof recognition.

---

## Features

-  **Personalized Interview Generation** using AI  
-  **Real-time AI Interviewer** powered by Vapi Agent  
-  **Firebase Authentication**  
-  **Firebase Firestore Integration** to store:
  - User details
  - Interview questions
  - Feedback & scores
-  **Blockchain-Backed Certificate Generation** for interview completion  
-  **Tamper-proof Certificates** stored securely on the blockchain  
-  **Downloadable PDF Certificates**  

---

##  Tech Stack

| Layer           | Technology Used                    |
|-----------------|------------------------------------|
| Frontend        | Next.js / React                    |
| Realtime Agent  | Vapi Agent                         |
| Authentication  | Firebase Auth                      |
| Database        | Firebase Firestore                 |
| Certificate     | Custom Generator + Blockchain Hash |
| PDF Rendering   | `react-pdf`, `html2pdf.js`         |
| Blockchain      | Smart Contract (Ethereum)          |

---

##  Installation

###  Clone the repository

```bash
git clone https://github.com/neelam-bind/ai_mock_interviews
cd prepwise
```

###  Install dependencies

```bash
npm install
```

###  Setup Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable Authentication (Email/Password)
- Setup Firestore Database
- Add your Firebase config to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Configure Vapi Agent

- Sign up at [Vapi.ai](https://vapi.ai/)
- Create your agent and get your API key and Agent ID
- Add the following to `.env.local`:

```env
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key
NEXT_PUBLIC_VAPI_AGENT_ID=your_vapi_agent_id
```

### Setup Blockchain

- Deploy a smart contract (Solidity recommended) to your preferred chain
- Add blockchain credentials to `.env.local`:

```env
BLOCKCHAIN_RPC_URL=your_rpc_url
BLOCKCHAIN_PRIVATE_KEY=your_private_key
BLOCKCHAIN_CONTRACT_ADDRESS=your_contract_address
```

---

##  Usage

1. **Sign Up / Log In** using Firebase Authentication  
2. **Take Interview**
   - PrepWise generates personalized questions based on the user profile
   - Vapi Agent conducts a real-time audio interview
3. **Receive Feedback**
   - AI evaluates responses
   - Score and feedback are stored in Firestore
4. **Earn Certificate**
   - If the score is ≥ 60%, the user receives a completion certificate
   - Certificate metadata is stored on IPFS and registered on blockchain
   - User can download a tamper-proof PDF version

---

##  Blockchain Certificate Metadata Format

Example of certificate metadata stored on IPFS and validated via the blockchain:

```json
{
  "certificate_id": "abc123",
  "recipient": "user_id_or_wallet",
  "issuer": "PrepWise",
  "type": "Mock Interview Completion",
  "score": 78,
  "date": "2025-04-12",
  "hash": "QmHash...",
  "signature": "0xDigitalSignature"
}
```

This data is hashed and stored on-chain for verification and audit.

---

##  Completion Criteria

- Interview completed  
- Score ≥ 60%  
- Feedback generated  
- Certificate issued and saved on blockchain  
- PDF available for download  

---

##  Security & Privacy

- Firebase Authentication ensures user identity is secure  
- Firestore rules protect interview data and personal details  
- Only hashed metadata stored on blockchain (no sensitive info)  
- Vapi agent is secured through access tokens and auth headers  

---

##  License

This project is licensed under the **MIT License**.  
Feel free to use, fork, enhance, and build your own AI coaching platforms.

---

##  Contribution

Pull requests are welcome. If you find a bug, want a feature, or have suggestions:

- Open an issue [here](https://github.com/neelam-bind/ai_mock_interviews/issues)  
- Submit a PR with a meaningful commit message

---

##  Live Demo

> Coming soon at: [🌐 Visit PrepWise Live](https://ai-mock-interviews-mu.vercel.app)
