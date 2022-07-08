const {
    createCandidate,
    updateCandidate,
    deleteCandidate,
    getAllCandidates,
    // voterLogin,
    getCurrentCandidate
  } = require("../controllers/candidate.controller");
  const { admin } = require("../middlewares/admin.middleware");
  const {
    auth
  } = require("../middlewares/auth.middleware");
  
  module.exports = (app) => {
  
    var router = require("express").Router();
  
    router.route("/")
        /**
     * @swagger
     * /candidates:
     *   get:
     *     tags:
     *       - Candidate
     *     description: Returns all Candidates
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
         .get([admin,auth, getAllCandidates])
      /**
       * @swagger
       * /candidates:
       *   post:
       *     tags:
       *       - Candidate
       *     description: Create a candidate
       *     parameters:
       *       - name: body
       *         description: Fields for a candidate
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/Candidate'
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
      .post([admin,auth,createCandidate])
      
      router.route("/:id")
      /**
       * @swagger
       * /candidates/{id}:
       *   put:
       *     tags:
       *       - Candidate
       *     description: Update a candidate
       *     security:
       *       - bearerAuth: -[]
       *     parameters:
       *       - name: body
       *         description: Fields for a candidate
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/Candidate'
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
      .put([admin,auth, updateCandidate])
      /**
       * @swagger
       * /candidate:
       *   delete:
       *     tags:
       *       - Candidate
       *     description: Delete Candidate
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
      .delete([admin,auth, deleteCandidate]);
  
    router.route("/current")
      /**
       * @swagger
       * /candidates/current:
       *   get:
       *     tags:
       *       - Candidate
       *     description: Returns current Candidate
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
      .get([admin,auth, getCurrentCandidate])
  
    app.use("/api/candidates", router);
  };