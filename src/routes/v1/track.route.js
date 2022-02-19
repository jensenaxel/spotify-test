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
 *               isrc: fake name
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

