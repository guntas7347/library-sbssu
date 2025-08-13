import { z } from "zod";

// Defines the structure for the 'ISSUE-PERMISSION' setting.
// It must be an object where keys are strings (member types)
// and values are booleans (true or false).
export const issuePermissionSchema = z.record(z.string(), z.boolean());
