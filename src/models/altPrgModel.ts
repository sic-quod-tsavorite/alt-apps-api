import { Schema, model } from "mongoose";
import { AltProgram } from "../interfaces/altProgram";

/**
 * Define the Alternative Program schema for ts
 */
const altPrgSchema = new Schema<AltProgram>({
  name: { type: String, required: true, min: 5, max: 100 },
  description: { type: String, required: false, min: 10, max: 255 },
  logo: { type: String, required: true },
  country: { type: String, required: true },
  isHidden: { type: Boolean, required: true, default: false },
  _createdBy: { type: String, ref: "User", required: true },
});

export const altPrgModel = model<AltProgram>("AltProgram", altPrgSchema);

/**
 * Handle program version for db (when updating an already existing alternative program)
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
 * Alternative program version control for when it gets updated
 */
altPrgSchema.pre("findOneAndUpdate", function <T extends Document>(this: any) {
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
