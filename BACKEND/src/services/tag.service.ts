import { ITag, Tag } from "../models";
export type TagParams = {
  name: string;
  description: string;
  color: string;
};
export class TagService {
  static create = async ({
    name,
    description,
    color,
  }: TagParams): Promise<ITag> => {
    const tag = await Tag.create({ name, description, color });
    return tag;
  };
  static get = async (): Promise<ITag[]> => {
    const tag = await Tag.find({});
    return tag;
  };
}
