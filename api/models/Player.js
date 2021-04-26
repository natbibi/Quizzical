const { init } = require("../dbConfig/init");
const { ObjectId } = require("mongodb");

class Player {
    constructor(data) {
        this.id = data.id;
        this.player = data.player;
        this.score = data.score;
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const playersData = await db
                    .collection("players")
                    .find()
                    .toArray();
                const players = playersData.map(
                    (p) => new Player({ ...p, id: p._id })
                );
                resolve(players);
            } catch (err) {
                reject(`Error retrieving players: ${err}`);
            }
        });
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let playerData = await db
                    .collection("players")
                    .find({ _id: ObjectId(id) })
                    .toArray();
                let player = new Player({
                    ...playerData[0],
                    id: playerData[0]._id,
                });
                resolve(player);
            } catch (err) {
                reject("Player not found");
            }
        });
    }

    static create(playerData) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(playerData);
                const db = await init();
                const createPlayer = await db
                    .collection("players")
                    .insertOne({ ...playerData });
                resolve(createPlayer.ops[0]._id);
            } catch (err) {
                reject("Error creating player");
            }
        });
    }

    update(highScore) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let updatedPlayerData = await db.collection('players').findOneAndUpdate({ _id: ObjectId(this.id) }, { score: highScore }, { returnOriginal: false })
                let updatedPlayer = new Player(updatedPlayerData.value);
                resolve (updatedPlayer);
            } catch (err) {
                reject('Error updating player score');
            }
        });
    }
}

module.exports = Player;
