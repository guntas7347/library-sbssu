import { bookCategoriesSchema } from "../../schema/settings/validators/bookCategoriesSchema.js";
import { issueDurationSchema } from "../../schema/settings/validators/issueDurationSchema.js";
import { libraryCardTypesSchema } from "../../schema/settings/validators/libraryCardTypesSchema.js";
import { memberTypesSchema } from "../../schema/settings/validators/memberTypesSchema.js";
import { finePerDaySchema } from "../../schema/settings/validators/finePerDaySchema.js";
import { programsSchema } from "../../schema/settings/validators/programsSchema.js";
import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { issuePermissionSchema } from "../../schema/settings/validators/issuePermissionSchema.js";
import { issueCompatibilitySchema } from "../../schema/settings/validators/issueCompatibilitySchema.js";
import { autoAllotSchema } from "../../schema/settings/validators/autoAllotSchema.js";
// Import other setting schemas as you create them
// import { fineRatesSchema } from "../schemas/fineRatesSchema.js";

// This map is now the single source of truth for all allowed settings.
const settingValidators = {
  PROGRAMS: programsSchema,
  "ISSUE-DURATION": issueDurationSchema,
  "BOOKS-CATEGORIES": bookCategoriesSchema,
  "MEMBER-TYPES": memberTypesSchema,
  "LIBRARY-CARD-TYPES": libraryCardTypesSchema,
  "FINE-PER-DAY": finePerDaySchema,
  "ISSUE-PERMISSION": issuePermissionSchema,
  "ISSUE-COMPATIBILITY": issueCompatibilitySchema,
  "LIBRARY-CARD-AUTO-ALLOT-LIMIT": autoAllotSchema,
};

/**
 * A secure handler for updating application settings.
 * It strictly validates the 'value' for every 'key' against a predefined schema.
 */
export const updateSettingHandler = async (req, res) => {
  try {
    const { key, value } = req.body;

    // 1. Find the validator for the given key.
    const validator = settingValidators[key];

    // 2. **CRITICAL CHANGE**: If no validator is found for the key, reject the request.
    // This prevents any unknown or untyped settings from being saved.
    if (!validator) {
      return res.status(400).json(crs(`'${key}' is not a valid setting.`));
    }

    // 3. If a validator is found, parse the value. This will throw an error if the structure is wrong.
    const validationResult = validator.safeParse(value);
    if (!validationResult.success) {
      const firstErrorMessage =
        validationResult.error?.errors?.[0].message ||
        `The provided value for the '${key}' setting has an invalid structure.`;
      return res.status(400).json({
        code: "ZOD_400_INVALID_INPUT",
        message: firstErrorMessage,
        errors: validationResult.error.flatten(),
      });
    }

    // 4. Perform the update using 'upsert'.
    const updatedSetting = await prisma.setting.upsert({
      where: { key: key },
      // Use the validated and potentially transformed data from Zod
      update: { value: validationResult.data },
      create: { key: key, value: validationResult.data },
    });

    return res.status(200).json(crs.SETTINGS_200_UPDATED(updatedSetting));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
