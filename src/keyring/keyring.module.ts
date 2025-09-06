import { Module } from '@nestjs/common';
import { KeyringController } from './keyring.controller';
import { KeyringService } from './keyring.service';
import { SailscallsService } from '../SailscallsService/sailscallsClient.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [KeyringController],
  providers: [KeyringService, SailscallsService, JwtService]
})
export class KeyringModule {}
