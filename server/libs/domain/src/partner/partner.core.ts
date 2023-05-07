import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { IPartnerRepository, PartnerDirection } from './partner.repository';
import { PartnerEntity } from '@app/infra/entities';

export class PartnerCore {
  readonly logger = new Logger(PartnerCore.name);

  constructor(private repository: IPartnerRepository) {}

  getAll(userId: string, direction: PartnerDirection): Promise<PartnerEntity[]> {
    return this.repository.getAll(userId, direction);
  }

  get(sharedBy: string, sharedWith: string): Promise<PartnerEntity | null> {
    return this.repository.get(sharedBy, sharedWith);
  }

  create(sharedBy: string, sharedWith: string): Promise<PartnerEntity> {
    try {
      return this.repository.create({
        sharedBy: sharedBy,
        sharedWith: sharedWith,
      });
    } catch (error: any) {
      this.logger.error(error, error.stack);
      throw new InternalServerErrorException('failed to create partner');
    }
  }

  async remove(sharedBy: string, sharedWith: string): Promise<PartnerEntity> {
    const partner = await this.get(sharedBy, sharedWith);
    if (!partner) {
      throw new BadRequestException('Partner not found');
    }

    return this.repository.remove(partner);
  }
}