const {
    getAllVotings,
    createVoting,
    updateVoting,
    deleteVoting
  } = require("../controllers/voting.controller");
  const {
    auth
  } = require("../middlewares/auth.middleware");
  
  module.exports = (app) => {
  
    var router = require("express").Router();
  
    // Create a new Voting
    router.route("/")
      /**
       * @swagger
       * /voting:
       *   get:
       *     tags:
       *       - Voting
       *     description: Returns all Votings
       *     security:
       *       - bearerAuth: -[]
       *     parameters:
       *       - name: page
       *         description: page number
       *         in: query
       *         type: string
       *       - name: limit
       *         description: elements per page
       *         in: query
       *         type: string
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
      .get([auth, getAllVotings])
      /**
       * @swagger
       * /voting:
       *   post:
       *     tags:
       *       - Voting
       *     description: Create a voting
       *     security:
       *       - bearerAuth: -[]
       *     parameters:
       *       - name: body
       *         description: Fields for a voting
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/Voting'
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
      .post([auth, createVoting]);
  
    // Create a new Voting
    router.route("/:id")
      /**
       * @swagger
       * /voting/{id}:
       *   put:
       *     tags:
       *       - Voting
       *     description: Create a voting
       *     security:
       *       - bearerAuth: -[]
       *     parameters:
       *       - name: id
       *         description: voting id
       *         in: path
       *         type: string
       *         required: true
       *       - name: body
       *         description: Fields for a voting
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/Voting'
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
      .put([auth, updateVoting])
      /**
       * @swagger
       * /voting/{id}:
       *   delete:
       *     tags:
       *       - Voting
       *     description: Delete voting
       *     security:
       *       - bearerAuth: -[]
       *     parameters:
       *       - name: id
       *         description: voting id
       *         in: path
       *         type: string
       *         required: true
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
      .delete([auth, deleteVoting]);
  
    app.use("/api/voting", router);
  };