# Building a Digital Ledger (Blockchain) from Scratch — JavaScript

An educational blockchain/digital-ledger implementation built in JavaScript (Node.js) as part of a structured learning sprint I am completing by freeCodeCamp's "Learn Digital Ledgers by Building a Blockchain".

This repo focuses on core blockchain concepts including proof-of-work mining, transaction handling, and cryptographic validation, making the data model and logic easy to inspect, extend, and discuss in interviews.

## Why this project

I’m building in the Web3 space because I’m genuinely interested in decentralized systems and the engineering tradeoffs behind them. This codebase is a hands-on way to demonstrate:

- Practical JavaScript/Node.js fundamentals (modules, file I/O, CLI inputs)
- Data structures and invariants (linked history via `previousHash`)
- Integrity checks (basic chain validation)
- Iterative engineering (small, testable steps with a clear roadmap)

## What it does (today)

- Stores a blockchain as an array of blocks persisted to disk (`blockchain.json`)
- Stores pending transactions in a separate file (`transactions.json`)
- Creates a genesis block (`init-blockchain.js`)
- Adds transactions to the pending pool (`add-transaction.js`)
- Mines new blocks with proof-of-work, including pending transactions and a mining reward (`mine-block.js`)
- Validates the chain by checking cryptographic integrity and block linkage (`validate-chain.js`)

### Block shape

A block is represented as plain JSON like:

```json
{
  "nonce": 1191,
  "hash": "004aeef7932d04399370cb191df97b26f9590187026d5305ce58ec0aa5d3c767",
  "previousHash": "0",
  "transactions": [
    {
      "fromAddress": "You",
      "toAddress": "Me",
      "amount": 12
    }
  ]
}
```

The `hash` is computed using SHA-256 with `nonce`, `previousHash`, and `transactions` to ensure integrity. The validator recomputes hashes to verify the chain.

## Quickstart

### Prerequisites
- Node.js installed (modern Node recommended)
- This repo cloned locally

### Installation
```bash
npm install
```

### 1) Initialize the chain (genesis block)
```bash
node init-blockchain.js
```

This creates/overwrites `blockchain.json` with a genesis block and `transactions.json` with an empty array.

### 2) Add transactions to the pending pool
```bash
node add-transaction.js <fromAddress> <toAddress> <amount>
```

Example:
```bash
node add-transaction.js Alice Bob 25
node add-transaction.js Charlie Alice 10
```

### 3) Mine a new block
```bash
node mine-block.js
```

This mines a block with the current pending transactions, adds a mining reward transaction, and appends the block to the chain. The pending transactions are replaced with the reward transaction.

### 4) Validate the chain
```bash
node validate-chain.js
```

Outputs:
- `Chain is valid` if every block correctly references the previous block and hashes are valid
- `Chain is not valid` otherwise

## Project structure

- `blockchain-helpers.js` — read/write helpers for blockchain and transactions + `isValidChain()` implementation
- `init-blockchain.js` — creates the genesis block and initializes the chain and transactions
- `add-transaction.js` — adds a transaction to the pending pool using CLI arguments
- `mine-block.js` — mines a new block with proof-of-work, including pending transactions and mining reward
- `validate-chain.js` — prints validity based on `isValidChain()`
- `blockchain.json` — persisted ledger state (generated at runtime)
- `transactions.json` — pending transactions pool (generated at runtime)

## Design notes (what an employer/collaborator should know)

- **Simple by design:** the goal is clarity of the ledger mechanics, not production-grade consensus.
- **Explicit persistence:** the chain and transactions are stored as JSON on disk to keep the state inspectable and versionable during learning.
- **Invariants enforced:** validation enforces cryptographic integrity (recomputed hashes) and linked history (`previousHash` → `hash`).
- **Proof-of-Work:** mining requires finding a nonce that makes the hash start with a certain number of zeros.

## Roadmap (bringing it closer to a real blockchain)

Completed features:

1. **Deterministic hashing (SHA-256)** ✓
   - Compute `hash = SHA256(nonce + previousHash + transactions)`
   - Validate by recomputing hashes rather than trusting stored values
2. **Proof-of-Work** ✓
   - Add `nonce` + a difficulty target (e.g., leading zeros)
3. **Transaction model** ✓
   - Separate transactions from blocks (mempool → mined blocks)

Planned extensions (in order of value for learning and correctness):

4. **Public/private key signatures**
   - Sign transactions, verify signatures, prevent spoofing
5. **Balance calculation + basic rules**
   - Prevent overspending (UTXO-style or account-based)
6. **Testing**
   - Unit tests for hashing, validation, and edge cases
7. **Networking (optional)**
   - Peer-to-peer sync and conflict resolution (longest/most-work chain)

If you want to collaborate, review the roadmap, open an issue with suggestions, or propose a small PR that improves correctness without sacrificing readability.

## Acknowledgements

This project is from a course instructed by freeCodeCamp’s building a blockchain/digital ledger in JavaScript.
S
