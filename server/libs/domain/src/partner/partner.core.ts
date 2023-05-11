import { BadRequestException, Logger } from '@nestjs/common';
import { IPartnerRepository, PartnerDirection } from './partner.repository';
import { PartnerEntity } from '@app/infra/entities';

export interface PartnerIds {
  sharedBy: string;
  sharedWith: string;
}

export class PartnerCore {
  readonly logger = new Logger(PartnerCore.name);

  constructor(private repository: IPartnerRepository) {}

  getAll(userId: string, direction: PartnerDirection): Promise<PartnerEntity[]> {
    return this.repository.getAll(userId, direction);
  }

  get({ sharedBy, sharedWith }: PartnerIds): Promise<PartnerEntity | null> {
    return this.repository.get(sharedBy, sharedWith);
  }

  create({ sharedBy, sharedWith }: PartnerIds): Promise<PartnerEntity> {
    return this.repository.create({
      sharedBy,
      sharedWith,
    });
  }

  async remove({ sharedBy, sharedWith }: PartnerIds): Promise<PartnerEntity> {
    const partner = await this.get({ sharedBy, sharedWith });
    if (!partner) {
      throw new BadRequestException('Partner not found');
    }

    return this.repository.remove(partner);
  }

  async hasAssetAccess(assetId: string, userId: string): Promise<boolean> {
    return this.repository.hasAssetAccess(assetId, userId);
  }
}
