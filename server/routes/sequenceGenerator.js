var Sequence = require('../models/sequence');

var maxUserId;
var maxTestimonyId; 
var sequenceId = null;

function SequenceGenerator() {

    Sequence.findOne().then(sequence => {


        sequenceId = sequence._id;
        maxUserId = sequence.maxUserId;
        maxTestimonyId = sequence.maxTestimonyId;
    }).catch(err => {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });

    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {

    var updateObject = {};
    var nextId;

    switch (collectionType) {
        case 'testimony':
            maxTestimonyId++;
            updateObject = { maxTestimonyId: maxTestimonyId };
            nextId = maxTestimonyId;
            break;
        case 'user':
            maxUserId++;
            updateObject = { maxUserId: maxUserId };
            nextId = maxUserId;
            break;
        default:
            return -1;
    }

    Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }).then(
        (result) => {
            return result
        })
        .catch(err => {
            console.log("nextId error = " + err);
        });

    return nextId;
}

module.exports = new SequenceGenerator();