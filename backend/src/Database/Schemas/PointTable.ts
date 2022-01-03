import mongoose, { Document, model, Schema } from "mongoose"
import increment from "mongoose-auto-increment";
import { MongoDB_URI } from "../../Config";
import { IPointTable } from "../../Interfaces/PointTable";

const PointTableSchema = new Schema
(
    {

        contributor_id: Number,

        /**
         * @description
         * Amount of stars giving from our repositories
         */
        tStars: {
            type: Number,
            default: 0
        },
        /**
         * @description
         * Amount of commits in total from our repositories
         */
        tCommits: {
            type: Number,
            default: 0
        },
        /**
         * @description
         * Amount of pull requests in total from our repositories
         */
        tPullRequests: {
            type: Number,
            default: 0
        },
        /**
         * @description
         * Amount of issues in total from our repositories
         */
        tIssues: {
            type: Number,
            default: 0
        },
        /**
         * @description
         * Amount of forks in total from our repositories
         */
        tForks: {
            type: Number,
            default: 0
        },
        /**
         * @description
         * Amount of members from our organization contributor is following.
         */
        tFollowing: {
            type: Array,
            default: []
        },
        /**
         * @description
         * The amount of points manually added from administrator.
         * Using this due to seperate the experience of the user.
         * Since it can be confused with the points gained from
         * the automated ones.
         */
        pointsRecieved: {
            type: Number,
            default: 0
        },
    
        history: {
            type: Array,
            default: []
        },

    }
);

const connection = mongoose.createConnection(MongoDB_URI);
increment.initialize(connection);

PointTableSchema.plugin(increment.plugin, {
    model: 'point_table',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});

const PointTableModel = model<IPointTable & Document>("point_table", PointTableSchema);

export default PointTableModel;