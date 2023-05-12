import { PartnerEntity } from '@app/infra/entities';

export interface PartnerIds {
  sharedBy: string;
  sharedWith: string;
}

export enum PartnerDirection {
  SharedBy = 'shared-by',
  SharedWith = 'shared-with',
}

export const IPartnerRepository = 'IPartnerRepository';

export interface IPartnerRepository {
  getAll(userId: string, direction: PartnerDirection): Promise<PartnerEntity[]>;
  get(partner: PartnerIds): Promise<PartnerEntity | null>;
  create(partner: PartnerIds): Promise<PartnerEntity>;
  remove(entity: PartnerEntity): Promise<void>;
  hasAssetAccess(assetId: string, userId: string): Promise<boolean>;
}
