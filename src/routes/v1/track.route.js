const express = require('express');
const validate = require('../../middlewares/validate');
const trackValidation = require('../../validations/track.validation');
const trackController = require('../../controllers/track.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(trackValidation.createTrack), trackController.createTrack);

router
  .route('/:isrc')
  .get(validate(trackValidation.getTrackByISRC), trackController.getTrackByISRC);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Tracks
 *   description: Track management and retrieval
 */

/**
 * @swagger
 * /tracks:
 *   post:
 *     summary: Create a track with an ISRC
 *     description: This post will search spotify and store results if they exist, it will do nothing.
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isrc
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                  type: string
 *                  enum: [user, admin]
 *             example:
 *               isrc: USVT10300001
 *     responses:
 *       "200":
 *         description: Okay
 *         content:
 *           application/json:
 */


/**
 * @swagger
 * /tracks/{isrc}:
 *   get:
 *     summary: Get a track by isrc
 *     description: Get track by isrc
 *     tags: [Tracks]
 *     parameters:
 *       - in: path
 *         name: isrc
 *         required: true
 *         schema:
 *           type: string
 *         description: ISRC
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 */
