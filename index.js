const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/savethislife?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
mongoose.set("useFindAndModify", false);

const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB Database connection established Successfully.");

    async function start() {
        for (let i = 31293; i < 938750; i++) {
            console.log("Page " + i);
            await merge(i);
        }
    }
    start();
});

const ownerSchema = require("./models/owner.model");
const petSchema = require("./models/pet.model");
const photoSchema = require("./models/photo.model");

async function merge(pageId) {
    console.log("merge function called");

    let pets = {};
    try {
        pets = await petSchema.paginate(
            {},
            {
                page: pageId,
                limit: 30,
            }
        );
    } catch (error) {
        console.log(error);
    }

    if (pets) {
        for (let i = 0; i < pets.docs.length; i++) {
            let pet = pets.docs[i];
            let owner = {};
            let photo = {};
            try {
                owner = await ownerSchema.findOne({
                    email: pet.email,
                });
            } catch (error) {
                console.log(error);
            }
            try {
                photo = await photoSchema.findOne({
                    petMicrochip: pet.microchip,
                });
            } catch (error) {
                console.log(error);
            }

            const new_pet = {
                ...pet._doc,
                ...{
                    ownerId: owner === null ? "" : owner._id,
                    ownerName: owner === null ? "" : owner.ownerName,
                    photoPath: photo === null ? "" : photo.petPhotoData,
                },
            };

            try {
                await petSchema.updateOne({ _id: new_pet._id }, new_pet);
                console.log("pet " + new_pet.microchip + " Updated");
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        console.log("page end");
    }
}
