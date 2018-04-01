import {base64DecodeFromString, byteArray2hexStr} from "../lib/crypto/code";
import {getAddressFromPriKey} from "../lib/crypto/crypto";

export function passwordToAddress(password) {
  let com_priKeyBytes = base64DecodeFromString(password);
  let com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
  return byteArray2hexStr(com_addressBytes);
}
