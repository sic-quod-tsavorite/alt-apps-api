import { User } from "./user";

export interface AltProgram extends Document {
  id: string;
  name: string;
  description: string;
  logo: string;
  country: string;
  isHidden: boolean;
  _createdBy: User["id"];
}
