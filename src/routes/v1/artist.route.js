const express = require('express');
const validate = require('../../middlewares/validate');
const artistValidation = require('../../validations/artist.validation');
const artistController = require('../../controllers/artist.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(artistValidation.getArtistByName), artistController.getArtistByName);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Artist
 *   description: Track retrieval by artist
 */

/**
 * @swagger
 * /artist:
 *   get:
 *     summary: Get artists by name
 *     description: This post will search spotify and return results if they exist.
 *     tags: [Artist]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Artist name
 *     responses:
 *       "200":
 *         description: Date returned
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Track'
 */

