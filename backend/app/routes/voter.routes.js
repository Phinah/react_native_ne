const {
    createVoter,
    updateVoter,
    deleteVoter,
    voterLogin,
    getCurrentVoter
  } = require("../controllers/voter.controller");
  const {
    auth
  } = require("../middlewares/auth.middleware");
  
  module.exports = (app) => {
  
    var router = require("express").Router();
  
    router.route("/")
      /**
       * @swagger
       * /voters:
       *   post:
       *     tags:
       *       - Voter
       *     description: Create a voter
       *     parameters:
       *       - name: body
       *         description: Fields for a voter
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/Voter'
       *     responses:
       *       200:
       *         description: OK
       *       400:
       *         description: Bad Request
       *       404:
       *         description: Not Found
       *       401:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server Error
       */
      .post(createVoter)
      /**
       * @swagger
       * /voters:
       *   put:
       *     tags:
       *       - Voter
       *     description: Update a voter
       *     security:
       *       - bearerAuth: -[]
       *     parameters:
       *       - name: body
       *         description: Fields for a voter
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/Voter'
       *     responses:
       *       200:
       *         description: OK
       *       400:
       *         description: Bad Request
       *       404:
       *         description: Not Found
       *       401:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server Error
       */
      .put([auth, updateVoter])
      /**
       * @swagger
       * /voter:
       *   delete:
       *     tags:
       *       - Voter
       *     description: Delete Voter
       *     security:
       *       - bearerAuth: -[]
       *     responses:
       *       200:
       *         description: OK
       *       400:
       *         description: Bad Request
       *       404:
       *         description: Not Found
       *       401:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server Error
       */
      .delete([auth, deleteVoter]);
  
    router.route("/current")
      /**
       * @swagger
       * /voters/current:
       *   get:
       *     tags:
       *       - Voter
       *     description: Returns current Voter
       *     security:
       *       - bearerAuth: -[]
       *     responses:
       *       200:
       *         description: OK
       *       400:
       *         description: Bad Request
       *       404:
       *         description: Not Found
       *       401:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server Error
       */
      .get([auth, getCurrentVoter])
  
    router.route("/login")
      /**
       * @swagger
       * /voters/login:
       *   post:
       *     tags:
       *       - Voter
       *     description: Voter Login
       *     parameters:
       *       - name: body
       *         description: Fields for a voter
       *         in: body
       *         required: true
       *         schema:
       *           properties:
       *            email:
       *              type: string
       *            password:
       *              type: string
       *     responses: 
       *       200:
       *         description: OK
       *       400:
       *         description: Bad Request
       *       404:
       *         description: Not Found
       *       401:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server Error
       */
      .post(voterLogin)
  
    app.use("/api/voters", router);
  };