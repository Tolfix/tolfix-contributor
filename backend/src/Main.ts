require("dotenv").config();
// Hate this .default shit....
require("./Cron/Github/CronRespositories").default(true);
import "./Database/Mongo";
import "./Server/Express";
import "./Discord/Client";
import "./Events/NodeEvents";

// Crons
import "./Cron/PointGathering/CronPointGathering";