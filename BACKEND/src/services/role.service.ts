import httpStatus from 'http-status';
import { IRole, Role } from '../models';
import APIError from '../utils/APIError';
import log from '../utils/logger';

export interface IRoleParams {
  roleName: string;
}
export default class RoleSerivce {
  static create = async ({ roleName }: IRoleParams): Promise<IRole> => {
    const isExistRole = await Role.findOne({ roleName: roleName });
    if (isExistRole) {
      throw new APIError({
        message: 'Role is already exists',
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    const newRole = await Role.create({ roleName });
    if (!newRole) {
      throw new APIError({
        message: 'Cannot create new role',
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    return newRole;
  };
  static getAll = async (): Promise<IRole[]> => {
    return Role.find({}).sort({ createdAt: -1 }).lean();
  };
}
