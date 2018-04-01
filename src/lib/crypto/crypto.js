/* eslint-disable */
import {base64DecodeFromString, hexStr2byteArray} from "./code";
const EC = require('elliptic').ec;
const CryptoJS = require("crypto-js");
import { sha3_256 } from 'js-sha3';

/**
 * Sign A Transaction by priKey.
 * signature is 65 bytes, r[32] || s[32] || id[1](<27)
 * @returns  a Transaction object signed
 * @param priKeyBytes: privateKey for ECC
 * @param transaction: a Transaction object unSigned
 */
function signTransaction(priKeyBytes, transaction) {
  let raw = transaction.getRawData();
  let rawBytes = raw.serializeBinary();
  let hashBytes = SHA256(rawBytes);
  let signBytes = ECKeySign(hashBytes, priKeyBytes);
  let uint8Array = new Uint8Array(signBytes);
  let count = raw.getContractList().length;
  for (let i = 0; i < count; i++) {
    transaction.addSignature(uint8Array); //TODO: multy priKey
  }
  return transaction;
}

//return bytes of rowdata, use to sign.
function getRowBytesFromTransactionBase64(base64Data) {
  let bytesDecode = base64DecodeFromString(base64Data);
  let transaction = proto.protocol.Transaction.deserializeBinary(bytesDecode);
  //toDO: assert ret is SUCESS
  let raw = transaction.getRawData();
  let rawBytes = raw.serializeBinary();
  return rawBytes;
}

//gen Ecc priKey for bytes
export function genPriKey() {
  let ec = new EC('secp256k1');
  let key = ec.genKeyPair();
  let priKey = key.getPrivate();
  let priKeyHex = priKey.toString('hex');
  while (priKeyHex.length < 64) {
    priKeyHex = "0" + priKeyHex;
  }
  let priKeyBytes = hexStr2byteArray(priKeyHex);
  return priKeyBytes;
}

//return address by bytes, pubBytes is byte[]
function computeAddress(pubBytes) {
  if (pubBytes.length == 65) {
    pubBytes = pubBytes.slice(1);
  }
  let hash = sha3_256(pubBytes).toString();
  let addressHex = hash.substring(24);
  let addressBytes = hexStr2byteArray(addressHex);
  return addressBytes;
}

//return address by bytes, priKeyBytes is byte[]
export function getAddressFromPriKey(priKeyBytes) {
  let pubBytes = getPubKeyFromPriKey(priKeyBytes);
  let addressBytes = computeAddress(pubBytes);
  return addressBytes;
}
//return address by String, priKeyBytes is base64String
function getHexStrAddressFromPriKeyBase64String(priKeyBase64String) {
    let priKeyBytes = base64DecodeFromString(priKeyBase64String);
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    let addressBytes = computeAddress(pubBytes);
    let addressHex = byteArray2hexStr(addressBytes);
    return addressHex;
}
//return address by String, priKeyBytes is base64String
function getAddressFromPriKeyBase64String(priKeyBase64String) {
  let priKeyBytes = base64DecodeFromString(priKeyBase64String);
  let pubBytes = getPubKeyFromPriKey(priKeyBytes);
  let addressBytes = computeAddress(pubBytes);
  let addressBase64 = base64EncodeToString(addressBytes);
  return addressBase64;
}

//return pubkey by 65 bytes, priKeyBytes is byte[]
function getPubKeyFromPriKey(priKeyBytes) {
  let ec = new EC('secp256k1');
  let key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  let pubkey = key.getPublic();
  let x = pubkey.x;
  let y = pubkey.y;
  let xHex = x.toString('hex');
  while (xHex.length < 64) {
    xHex = "0" + xHex;
  }
  let yHex = y.toString('hex');
  while (yHex.length < 64) {
    yHex = "0" + yHex;
  }
  let pubkeyHex = "04" + xHex + yHex;
  let pubkeyBytes = hexStr2byteArray(pubkeyHex);
  return pubkeyBytes;
}

//return sign by 65 bytes r s id. id < 27
function ECKeySign(hashBytes, priKeyBytes) {
  let ec = new EC('secp256k1');
  let key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  let signature = key.sign(hashBytes);
  let r = signature.r;
  let s = signature.s;
  let id = signature.recoveryParam;
  let rHex = r.toString('hex');
  while (rHex.length < 64) {
    rHex = "0" + rHex;
  }
  let sHex = s.toString('hex');
  while (sHex.length < 64) {
    sHex = "0" + sHex;
  }
  let idHex = byte2hexStr(id);
  let signHex = rHex + sHex + idHex;
  let signBytes = hexStr2byteArray(signHex);
  return signBytes;
}

//toDO:
//return 32 bytes
function SHA256(msgBytes) {
  let shaObj = new jsSHA("SHA-256", "HEX");
  let msgHex = byteArray2hexStr(msgBytes);
  shaObj.update(msgHex);
  let hashHex = shaObj.getHash("HEX");
  let hashBytes = hexStr2byteArray(hashHex);
  return hashBytes;
}
