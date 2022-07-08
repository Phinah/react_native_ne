const {
    compare
  } = require("bcryptjs");
  const {
    validateVoter,
    validateVoterLogin,
    Voter
  } = require("../models/voter.model");
  const {
    hashPassword
  } = require("../utils/imports");
  
  /***
   *  Create's a new voter
   * @param req
   * @param res
   */
  exports.createVoter = async (req, res) => {
    try {
      const {
        error
      } = validateVoter(req.body);
      if (error) return res.status(400).send({
        message: error.details[0].message
      });
  
      let count = await Voter.countDocuments({});
      if (count) return res.status(400).send({message: "Voter is already created"});
  
      // let {
      //   email,
      //   nationalId,
      //   phone
      // } = req.body
  
      // let user = await User.findOne({
      //   $or: [{
      //     email
      //   }, {
      //     nationalId
      //   }, {
      //     phone
      //   }],
      // })
  
      // if (user) {
      //   const phoneFound = phone == user.phone
      //   const emailFound = email == user.email
      //   return res.status(400).send({
      //     message: `User with same ${phoneFound ? 'phone ' : emailFound ? 'email ' : 'nationalId '} arleady exist`
      //   });
      // }
  
      req.body.password = await hashPassword(req.body.password);
  
      const newVoter = new Voter(req.body);
  
      const result = await newVoter.save();
  
      return res.status(201).send({
        message: 'CREATED',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }
  
  /***
   *  Create's a new voter
   * @param req
   * @param res
   */
   exports.getCurrentVoter = async (req, res) => {
    try {
  
      const result = await Voter.findOne({
        _id: req.voter._id
      });
  
      return res.status(201).send({
        message: 'OK',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }
  
  /**
   * Login User
   * @param req
   * @param res
   */
  exports.voterLogin = async (req, res) => {
    try {
      const {
        error
      } = validateVoterLogin(req.body);
      if (error) return res.status(400).send({
        message: error.details[0].message
      });
  
      const voter = await Voter.findOne({
        email: req.body.email
      });
      if (!voter) return res.status(404).send({
        message: 'Invalid credentials'
      });
  
      const validPassword = await compare(req.body.password, voter.password);
      if (!validPassword) return res.status(404).send({
        message: 'Invalid credentials'
      });
      return res.status(200).send({
        message: 'OK',
        token: await voter.generateAuthToken()
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
  exports.updateVoter = async (req, res) => {
    try {
  
      const {
        error
      } = validateVoter(req.body,true);
      if (error) return res.status(400).send({
        message: error.details[0].message
      });
  
      let {
        email,
        nationalId,
        phone
      } = req.body
  
      let dupplicate_user = await Voter.findOne({
        _id: {
          $ne: req.voter._id
        },
        $or: [{
          email: email
        }, {
          nationalId: nationalId
        }, {
          phone: phone
        }],
      })
  
      if (dupplicate_user) {
        const phoneFound = phone == dupplicate_user.phone
        const emailFound = email == dupplicate_user.email
        return res.status(400).send({
          message: `Voter with same ${phoneFound ? 'phone ' : emailFound ? 'email ' :  'nationalId '} arleady exist`
        });
      }
  
      const result = await Voter.findOneAndUpdate({
        _id: req.voter._id
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
  exports.deleteVoter = async (req, res) => {
    try {
  
      const result = await Voter.findOneAndDelete({
        _id: req.voter._id
      });
      if (!result)
        return res.status(404).send({
          message: 'Voter not found'
        });
  
      return res.send({
        message: 'DELETED',
        data: result
      });
    } catch (e) {
      return res.status(500).send(e.toString().split('\"').join(''))
    }
  }