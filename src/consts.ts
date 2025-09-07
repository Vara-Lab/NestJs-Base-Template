import { HexString } from "@gear-js/api";
import dotenv from "dotenv";

dotenv.config();

export const ONE_TOKEN = 1e12;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_REFRESH_TOKEN_KEY = process.env.JWT_REFRESH_TOKEN_KEY;
export const NETWORK = process.env.NETWORK;
export const PORT = process.env.PORT;
export const SPONSOR_NAME = process.env.SPONSOR_NAME;
export const SPONSOR_MNEMONIC = process.env.SPONSOR_MNEMONIC;
export const INITIAL_TOKENS_FOR_VOUCHER = Number(process.env.INITIAL_TOKENS_FOR_VOUCHER);
export const INITIAL_VOUCHER_EXPIRATION_TIME_IN_BLOCKS = Number(process.env.INITIAL_VOUCHER_EXPIRATION_TIME_IN_BLOCKS)
export const TOKENS_TO_ADD_TO_VOUCHER= Number(process.env.TOKENS_TO_ADD_TO_VOUCHER);
export const NEW_VOUCHER_EXPIRATION_TIME_IN_BLOCKS = Number(process.env.NEW_VOUCHER_EXPIRATION_TIME_IN_BLOCKS);
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as HexString; 
export const CONTRACT_IDL =  process.env.CONTRACT_IDL;
export const MIN_TOKENS_FOR_VOUCHER = Number(process.env.MIN_TOKENS_FOR_VOUCHER);
export const WORKER_WAITING_TIME_IN_MS = Number(process.env.WORKER_WAITING_TIME_IN_MS);
