import  sha256  from 'crypto-js/sha256.js';
import { 
  getBlockchain, 
  writeBlockchain, 
  getTransactions, 
  writeTransactions 
} from './blockchain-helpers.js';

const blockchain = getBlockchain();
const previousBlock = blockchain[blockchain.length - 1];
const transactions = getTransactions();

let nonce = 0;

let hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString();
console.log(hash);

const difficulty = 4; 

while (!hash.startsWith('0'.repeat(difficulty))){
  nonce++;
  hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString();
  
}

console.log(`nonce = ${nonce}`); 
console.log(`hash = ${hash}`);

const newBlock = {
  hash: hash,
  previousHash: previousBlock.hash,
  transactions
}

blockchain.push(newBlock);

//writeBlockchain(blockchain);
//writeTransactions([]);