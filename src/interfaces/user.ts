export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  registeredAt: Date;
}
