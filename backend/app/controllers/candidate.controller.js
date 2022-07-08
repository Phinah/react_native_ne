const {
    compare
  } = require("bcryptjs");
  const {
    validateCandidate,
    Candidate
  } = require("../models/candidate.model");
  const {
    hashPassword
  } = require("../utils/imports");
  
  /***
   *  Create's a new candidate
   * @param req
   * @param res
   */
  exports.createCandidate = async (req, res) => {
    try {
      const {
        error
      } = validateCandidate(req.body);
      if (error) return res.status(400).send({
        message: error.details[0].message
      });
  
      let count = await Candidate.countDocuments({});
      if (count) return res.status(400).send({message: "Candidate is already created"});
  
      req.body.password = await hashPassword(req.body.password);
  
      const newCandidate = new Candidate(req.body);
  
      const result = await newCandidate.save();
  
      return res.status(201).send({
        message: 'CREATED',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }
  
  /***
   *  Create's a new candidate
   * @param req
   * @param res
   */
  
   exports.getCurrentCandidate = async (req, res) => {
    try {
  
      const result = await Candidate.findOne({
        _id: req.candidate._id
      });
  
      return res.status(201).send({
        message: 'OK',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }

  exports.getAllCandidates = async (req, res) => {
    try {
        let {
            limit,
            page
        } = req.query;

        if (!page || page < 1) page = 1;

        if (!limit) limit = 10;

        const options = {
            page: page,
            limit: limit
        };

        const data = await Candidate.paginate({}, options)

        res.send({
            data
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}
  
  /***
   *  updates's a new candidate
   * @param req
   * @param res
   */
  exports.updateCandidate = async (req, res) => {
    try {
  
      const {
        error
      } = validateCandidate(req.body,true);
      if (error) return res.status(400).send({
        message: error.details[0].message
      });
  
      let {
        nationalId,
      } = req.body
  
      let dupplicate_user = await Candidate.findOne({
        _id: {
          $ne: req.candidate._id
        },
        $or: [{
          nationalId: nationalId
        }],
      })
  
      if (dupplicate_user) {
        return res.status(400).send({
          message: `Candidate with same nationalId arleady exist`
        });
      }
  
      const result = await Candidate.findOneAndUpdate({
        _id: req.candidate._id
      }, req.body, {
        new: true
      });
  
      return res.status(200).send({
        message: 'UPDATED',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }
  
  /***
   *  updates's a new user
   * @param req
   * @param res
   */
  exports.deleteCandidate = async (req, res) => {
    try {
  
      const result = await Candidate.findOneAndDelete({
        _id: req.candidate._id
      });
      if (!result)
        return res.status(404).send({
          message: 'Candidate not found'
        });
  
      return res.send({
        message: 'DELETED',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }