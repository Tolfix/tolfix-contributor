require("dotenv").config();
// Hate this .default shit....
require("./Cron/Github/CronRespositories").default(true);
import "./Database/Mongo";
import "./Server/Express";
import "./Discord/Client";
import "./Events/NodeEvents";

// Crons will automate this later.
// TODO: Automate it
require("./Cron/PointGathering/CronPointGathering").default();
