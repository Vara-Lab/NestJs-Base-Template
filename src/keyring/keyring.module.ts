import { Module } from '@nestjs/common';
import { KeyringController } from './keyring.controller';
import { KeyringService } from './keyring.service';
import { SailscallsService } from '../SailscallsService/sailscallsClient.service';
import { JwtService } from '@nestjs/jwt';
import { VouchersWorkerService } from '../VouchersWorkerService/vouchers_worker.service';

@Module({
  controllers: [KeyringController],
  providers: [KeyringService, SailscallsService, JwtService, VouchersWorkerService]
})
export class KeyringModule {}
