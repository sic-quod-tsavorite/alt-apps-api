import { User } from "./user";

export interface Program extends Document {
  name: string;
  description: string;
  logo: string;
  country: string;
  isHidden: boolean;
  _createdBy: User["id"];
}
