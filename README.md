# Miden Voting Demo

A fully client-side, privacy-preserving, anonymous voting application built with the [Miden SDK](https://github.com/0xMiden/miden-sdk) and React.

## Features
- **Admin can generate voting notes, note hashes, and Merkle root**
- **Users can vote anonymously using their note**
- **All cryptography and ZK logic is in-browser**
- **Live, on-chain tally using Miden contracts**
- **No backend required: all state is on-chain and visible to all**

## Why This Project?
This project is designed as a teaching tool for new developers to:
- Learn how to use the Miden SDK for account, note, and contract management
- Understand Merkle trees, note privacy, and zero-knowledge voting
- See how to build a real, live, privacy-preserving dApp with Miden

## Architecture
- **Admin Page**: Generate notes, hashes, Merkle root. Download notes for distribution. Only accessible to admin.
- **Voting Page**: Users submit their note and vote. The app generates a Merkle proof and ZK proof, and submits a transaction to the on-chain voting contract.
- **Results Page**: Reads the live Yes/No tally from the on-chain contract.

## Tutorials Used
- [Create and deploy accounts/faucets](https://0xmiden.github.io/miden-docs/imported/miden-tutorials/src/web-client/create_deploy_tutorial.html)
- [Mint and consume notes](https://0xmiden.github.io/miden-docs/imported/miden-tutorials/src/web-client/mint_consume_create_tutorial.html)
- [Create multiple notes](https://0xmiden.github.io/miden-docs/imported/miden-tutorials/src/web-client/creating_multiple_notes_tutorial.html)
- [Counter contract for tally](https://0xmiden.github.io/miden-docs/imported/miden-tutorials/src/web-client/counter_contract_tutorial.html)
- [Unauthenticated note voting](https://0xmiden.github.io/miden-docs/imported/miden-tutorials/src/web-client/unauthenticated_note_how_to.html)

## How to Run
1. `npm install`
2. `npm start`
3. Open [http://localhost:3000](http://localhost:3000)

## How It Works
- **Admin**: Generates notes and Merkle root, distributes notes to voters.
- **Voter**: Submits note and vote, app generates Merkle/ZK proof, submits vote.
- **Everyone**: Sees the live tally from the on-chain contract.

## Code Structure
- `/src/components/AdminPage.js` — Admin UI for note/root generation
- `/src/components/VotingPage.js` — User voting UI and ZK logic
- `/src/components/ResultsPage.js` — Live tally display
- `/src/utils/merkle.js` — Merkle tree utilities
- `/src/utils/miden.js` — Miden SDK helpers

## Comments and Documentation
- All code is heavily commented and documented for learning purposes.
- See inline comments for explanations of each step.

---

**This project is a reference implementation for Miden SDK dApps and is suitable for devrel interviews, hackathons, and onboarding new developers.** 