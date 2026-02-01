# Building a Digital Ledger (Blockchain) from Scratch — JavaScript

An educational blockchain/digital-ledger implementation built in JavaScript (Node.js) as part of a structured learning sprint I am completing by freeCodeCamp’s “Learn Digital Ledgers by Building a Blockchain”.

This repo is intentionally focuses on the core *ledger* idea—**a chain of blocks where each block references the previous one**—and makes the data model and validation logic easy to inspect, extend, and discuss in interviews.

## Why this project

I’m building in the Web3 space because I’m genuinely interested in decentralized systems and the engineering tradeoffs behind them. This codebase is a hands-on way to demonstrate:

- Practical JavaScript/Node.js fundamentals (modules, file I/O, CLI inputs)
- Data structures and invariants (linked history via `previousHash`)
- Integrity checks (basic chain validation)
- Iterative engineering (small, testable steps with a clear roadmap)

## What it does (today)

- Stores a blockchain as an array of blocks persisted to disk (`blockchain.json`)
- Creates a genesis block (`init-blockchain.js`)
- Appends new blocks that link to the previous block (`add-block.js`)
- Validates the chain by checking block-to-block linkage (`validate-chain.js`)

### Block shape

A block is currently represented as plain JSON like:

```json
{
  "hash": "...",
  "previousHash": "...",
  "data": {
    "fromAddress": "...",
    "toAddress": "...",
    "amount": ...
  }
}
```

**Important note:** In this educational phase, `hash` is generated with `Math.random()` and is used as an identifier. The validator currently checks *linking* (`previousHash` matches the prior block’s `hash`), not cryptographic integrity.

## Quickstart

### Prerequisites
- Node.js installed (modern Node recommended)
- This repo cloned locally

### 1) Initialize the chain (genesis block)
```bash
node init-blockchain.js
```

This creates/overwrites `blockchain.json` with a genesis block.

### 2) Add a block (a simple “transaction” payload)
```bash
node add-block.js <fromAddress> <toAddress> <amount>
```

Example:
```bash
node add-block.js Alice Bob 25
```

### 3) Validate the chain
```bash
node validate-chain.js
```

Outputs:
- `Chain is valid` if every block correctly references the previous block
- `Chain is not valid` otherwise

## Project structure

- `blockchain-helpers.js` — read/write helpers + `isValidChain()` implementation
- `init-blockchain.js` — creates the genesis block and writes the chain to disk
- `add-block.js` — appends a new block using CLI arguments
- `validate-chain.js` — prints validity based on `isValidChain()`
- `blockchain.json` — persisted ledger state (generated at runtime)

## Design notes (what an employer/collaborator should know)

- **Simple by design:** the goal is clarity of the ledger mechanics, not production-grade consensus.
- **Explicit persistence:** the chain is stored as JSON on disk to keep the state inspectable and versionable during learning.
- **Invariants enforced:** validation enforces the primary invariant of a linked history (`previousHash` → `hash`).

## Roadmap (bringing it closer to a real blockchain)

Planned extensions (in order of value for learning and correctness):

1. **Deterministic hashing (SHA-256)**
   - Compute `hash = SHA256(previousHash + timestamp + data + nonce)`
   - Validate by recomputing hashes rather than trusting stored values
2. **Proof-of-Work**
   - Add `nonce` + a difficulty target (e.g., leading zeros)
3. **Transaction model**
   - Separate transactions from blocks (mempool → mined blocks)
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
