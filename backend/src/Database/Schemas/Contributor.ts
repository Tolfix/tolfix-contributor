import mongoose, { Document, model, Schema } from "mongoose"
import increment from "mongoose-auto-increment";
import { MongoDB_URI } from "../../Config";
import { IContributor } from "../../Interfaces/Contributor";

const Contributor = new Schema
(
    {

        id: Number,

        email: String,

        github_id: Number,

        github_email: String,

        discord_id: {
            type: String,
            default: null
        },

    }
);

const connection = mongoose.createConnection(MongoDB_URI);
increment.initialize(connection);

Contributor.plugin(increment.plugin, {
    model: 'contributors',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});

const ContributorModel = model<IContributor & Document>("contributors", Contributor);

export default ContributorModel;