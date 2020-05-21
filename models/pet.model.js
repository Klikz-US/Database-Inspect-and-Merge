const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

let petSchema = new Schema(
    {
        microchip: {
            type: String,
            index: true,
        },
        petName: {
            type: String,
        },
        petSpecies: {
            type: String,
        },
        petBreed: {
            type: String,
        },
        petColor: {
            type: String,
        },
        petGender: {
            type: String,
        },
        petBirth: {
            type: Date,
        },
        specialNeeds: {
            type: String,
        },
        vetInfo: {
            type: String,
        },
        dateRV: {
            type: Date,
        },
        implantedCompany: {
            type: String,
        },
        email: {
            type: String,
        },
        ownerId: {
            type: String,
        },
        photoPath: {
            type: String,
        },
        ownerName: {
            type: String,
        },
        membership: {
            type: String,
            default: "platinum",
        },
        registered_at: {
            type: String,
            default: new Date(),
        },
    },
    {
        collection: "pets",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

petSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("petSchema", petSchema);
