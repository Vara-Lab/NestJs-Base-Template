import { GearApi, HexString } from "@gear-js/api";
import {
    NETWORK,
    CONTRACT_ADDRESS,
    CONTRACT_IDL,
    SPONSOR_NAME,
    SPONSOR_MNEMONIC,
    MIN_TOKENS_FOR_VOUCHER,
    TOKENS_TO_ADD_TO_VOUCHER,
    INITIAL_TOKENS_FOR_VOUCHER,
    NEW_VOUCHER_EXPIRATION_TIME_IN_BLOCKS,
    INITIAL_VOUCHER_EXPIRATION_TIME_IN_BLOCKS,
} from "../consts";
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { SailsCalls } from 'sailscalls';
import { VoucherService } from "../Voucher/voucher.service";  

@Injectable()
export class SailscallsService implements OnModuleInit, OnModuleDestroy {
    private sailsCalls: SailsCalls;
    private reconnectAPI = true;

    constructor(private voucherService: VoucherService) {}

    get sailsInstance() {
        return this.sailsCalls;
    }

    command() {
        return this.sailsCalls.command;
    }

    query() {
        return this.sailsCalls.query;
    }

    async createVoucher(userAddress: HexString): Promise<HexString> {
        return new Promise(async (resolve, reject) => {
            try {
                const { voucherId } = await this.voucherService.createVoucher({
                    userAddress
                });

                resolve(voucherId);
            } catch(e) {
                reject(e);
            }
        });
    }

    async checkVoucher(userAddress: HexString, voucherId: HexString) {
        const result = await this.voucherService.updateVoucher({
            userAddress,
            voucherId
        });

        return result;
    }

    async onModuleInit() {
        const api =  await GearApi.create({ 
            providerAddress: NETWORK
        });

        api.on("disconnected", async () => {
            if (!this.reconnectAPI) {
                return;
            }

            console.log("❌ Api disconnected, reconnectiong ...");

            let attemps = 0;

            while (!api.isConnected) {
                await api.connect();

                attemps ++;

                if (api.isConnected) {
                    console.log("✅ Api connected attemps: ", attemps);
                } else {
                    console.log("❌ Trying to connect again ...");
                }
            }
        });

        api.on("connected", () => {
            console.log("✅ Api connected");
        });

        let contractData = CONTRACT_IDL
            ? (
                [
                    {
                        contractName: 'contract',
                        address: CONTRACT_ADDRESS,
                        idl: CONTRACT_IDL
                    }
                ]
            ) : (
                []
            )

        this.sailsCalls = await SailsCalls.new({
            gearApi: api,
            voucherSignerData: {
                sponsorMnemonic: SPONSOR_MNEMONIC,
                sponsorName: SPONSOR_NAME
            },
            newContractsData: contractData
        });

        console.log('✅ Sailscalls service has been initialized.');
    }

    async onModuleDestroy() {
        console.log('Sailscalls service has been destroyed.');
        await this.sailsCalls.disconnectGearApi();
        this.reconnectAPI = false;
    }
}
