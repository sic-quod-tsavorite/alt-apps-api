import { User } from "./user";
import { AltProgram } from "./altProgram";

export interface Program extends Document {
  name: string;
  description: string;
  logo: string;
  country: string;
  isHidden: boolean;
  altPrograms: AltProgram["id"][];
  _createdBy: User["id"];
}
