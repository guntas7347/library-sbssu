import { getLibraryStats } from "../controllers/stats.controller.js";
import crs from "../utils/crs/crs.js";
import { createLog } from "../utils/log.js";

export const dashboardStats = async (req, res) => {
  try {
    const stats = await getLibraryStats();
    return res.status(200).json(crs.STATS_200_FETCHED(stats));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
