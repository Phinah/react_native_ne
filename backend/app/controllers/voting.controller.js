const {
    Voter
} = require("../models/user.model");
const {
    Candidate
} = require("../models/candidate.model");
const {
    validateVoting,
    Voting
} = require("../models/voting.model");
const {
    validateObjectId
} = require("../utils/imports");

/***
 * Get all Voting
 * @param req
 * @param res
 */
exports.getAllVotings = async (req, res) => {
    try {
        let {
            limit,
            page
        } = req.query;

        if (!page || page < 1) page = 1;

        if (!limit) limit = 10;

        const options = {
            page: page,
            limit: limit,
            populate: ['voter', 'candidate']
        };

        const data = await Voting.paginate({}, options)

        res.send({
            data
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}



/***
 *  Create's a new voting
 * @param req
 * @param res
 */
exports.createVoting = async (req, res) => {
    try {
        const {
            error
        } = validateVoting(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        if (!validateObjectId(req.body.voter))
            return res.status(400).send({
                message: 'Invalid Voter id'
            });

        if (!validateObjectId(req.body.candidate))
            return res.status(400).send({
                message: 'Invalid candidate id'
            });

        const voter = await Voter.findById(req.body.voter);

        if (!voter)
            return res.status(404).send({
                message: 'voter Not found'
            });

        const candidate = await Candidate.findById(req.body.candidate);

        if (!candidate)
            return res.status(404).send({
                message: 'Candidate Not found'
            });

        const isDupplicate = await Voting.findOne({
            candidate: req.body.candidate,
            voter: req.body.voter
        });

        if (isDupplicate)
            return res.status(404).send({
                message: 'Voter has already voted'
            });

        const newVoting = new Voting(req.body);

        const result = await newVoting.save();

        return res.status(201).send({
            message: 'CREATED',
            data: {...result._doc,candidate,voter}
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a voting
 * @param req
 * @param res
 */
exports.updateVoting = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const {
            error
        } = validateVoting(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        if (!validateObjectId(req.body.voter))
            return res.status(400).send({
                message: 'Invalid voter id'
            });

        if (!validateObjectId(req.body.candidate))
            return res.status(400).send({
                message: 'Invalid candidate id'
            });

        const voter = await Voter.findById(req.body.voter);

        if (!voter)
            return res.status(404).send({
                message: 'Voter Not found'
            });

        const candidate = await Candidate.findById(req.body.candidate);

        if (!candidate)
            return res.status(404).send({
                message: 'Candidate Not found'
            });

        const isDupplicate = await Voting.findOne({
            _id: {
                $ne: req.params.id
            },
            voter: req.body.voter
        });

        if (isDupplicate)
            return res.status(404).send({
                message: 'Voter has already voted'
            });

        const result = await Voting.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });
        if (!result)
            return res.status(404).send({
                message: 'This Voting was not made'
            });

        return res.status(200).send({
            message: 'UPDATED',
            data: {...result,voter,candidate}
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new voter
 * @param req
 * @param res
 */
exports.deleteVoting = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const result = await Voting.findOneAndDelete({
            _id: req.params.id
        });
        if (!result)
            return res.status(404).send({
                message: 'Voting not found'
            });

        return res.send({
            message: 'DELETED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}