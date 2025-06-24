import { Schema, model } from "mongoose";
import { Application } from "../interfaces/application";

/**
 * Define the Application schema for ts
 */
const appSchema = new Schema<Application>({
  name: { type: String, required: true, min: 5, max: 100 },
  description: { type: String, required: false, min: 10, max: 255 },
  logo: { type: String, required: true },
  country: { type: String, required: true },
  isHidden: { type: Boolean, required: true, default: false },
  _createdBy: { type: String, ref: "User", required: true },
});

export const appModel = model<Application>("App", appSchema);

/**
 * Handle app version for db (when updating an already existing app)
 */
type UpdateQuery<T> = {
  [key: string]: unknown;
} & {
  __v?: number;
  $set?: Partial<T> & { __v?: number };
  $setOnInsert?: Partial<T> & { __v?: number };
  $inc?: { __v?: number };
};

/**
 * App version control for when it gets updated
 */
appSchema.pre("findOneAndUpdate", function <T extends Document>(this: any) {
  const update = this.getUpdate() as UpdateQuery<T>;
  if (update.__v != null) {
    delete update.__v;
  }
  const keys: Array<"$set" | "$setOnInsert"> = ["$set", "$setOnInsert"];
  for (const key of keys) {
    if (update[key] != null && update[key]!.__v != null) {
      delete update[key]!.__v;
      if (Object.keys(update[key]!).length === 0) {
        delete update[key];
      }
    }
  }
  update.$inc = update.$inc || {};
  update.$inc.__v = 1;
});
