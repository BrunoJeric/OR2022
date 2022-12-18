const express = require('express'),
    router = express.Router(),
    Castle = require('../model/castle');

/**
 * @swagger
 * components:
 *   schemas:
 *     Castle:
 *       type: object
 *       properties:
 *         Founder: 
 *           type: object
 *           properties: 
 *             BirthName: 
 *               type: string
 *             FamilyName: 
 *               type: string
 *             Alias: 
 *               type: string
 *         _id: 
 *           type: string
 *         Name: 
 *           type: string
 *         Location: 
 *           type: string
 *         Status: 
 *           type: string
 *         Founded: 
 *           type: string
 *         Rulers: 
 *           type: array
 *           items: 
 *             type: object
 *             properties: 
 *               _id: 
 *                 type: string
 *               House: 
 *                 type: string
 *               Sigil: 
 *                 type: string
 *         Type: 
 *           type: string
 *         Religion: 
 *           type: string
 *         FandomURL: 
 *           type: string
 *         PlacesOfNote: 
 *           type: array
 *           items: 
 *             type: string 
 */

/**
 * @swagger
 * /castles:
 *  get:
 *    summary: Returns list of all castles
 *    responses:
 *      200:
 *        description: The list of castles
 *        content:
 *         application/json:
 *           schema: 
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Castle'
 *      500:
 *        description: Error
 *        content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               code: 
 *                 type: string
 *               message: 
 *                 type: string
 */
router.get('/', async (req, res) => {
    try{
        const castles = await Castle.find();
        res.json(castles);
    } catch(e) {
        res.status(500).json({ code: 500, message: e.message});
    }
})

/**
 * @swagger
 * /castles/one/{id}:
 *  get:
 *    summary: Returns castle with id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The castle Id
 *    responses:
 *      200:
 *        description: The castle
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Castle'
 *      404:
 *        description: The castle was not found
 *      500:
 *        description: Error
 *        content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               code: 
 *                 type: string
 *               message: 
 *                 type: string
 */
router.get('/one/:id', async (req, res) => {
    try{
        const castle = await Castle.findById(req.params.id);

        if (castle)
          res.json(castle);
        else
          res.status(404).json({ code: 404, message: 'Not Found'});
    } catch(e) {
      res.status(500).json({ code: 500, message: e.message});
    }
})


/**
 * @swagger
 * /castles/religions:
 *  get:
 *    summary: Returns list of all religions
 *    responses:
 *      200:
 *        description: religions
 *        content:
 *         application/json:
 *           schema: 
 *             type: array
 *             items:
 *               type: string
 *      500:
 *        description: Error
 *        content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               code: 
 *                 type: string
 *               message: 
 *                 type: string
 */

router.get('/religions', async (req, res) => {
    try{
        const religions = await Castle.find().distinct('Religion');

        if (religions)
          res.json(religions);
        else
          res.status(404).json({ code: 404, message: 'Not Found'});
    } catch(e) {
      res.status(500).json({ code: 500, message: e.message});
    }
})

/**
 * @swagger
 * /castles/rulers:
 *  get:
 *    summary: Returns list of all rulers
 *    responses:
 *      200:
 *        description: religions
 *        content:
 *         application/json:
 *           schema: 
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 House: 
 *                   type: string
 *                 Sigil: 
 *                   type: string
 *      500:
 *        description: Error
 *        content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               code: 
 *                 type: string
 *               message: 
 *                 type: string
 */
router.get('/rulers', async (req, res) => {
    try{
        const religions = await Castle.find().distinct('Rulers');

        if (religions)
          res.json(religions);
        else
          res.status(404).json({ code: 404, message: 'Not Found'});
    } catch(e) {
      res.status(500).json({ code: 500, message: e.message});
    }
})


/**
 * @swagger
 * /castles/:
 *  post:
 *    summary: Create new castle
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Castle'
 *    responses:
 *      200:
 *        description: The castle
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Castle'
 *      500:
 *        description: Error
 *        content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               code: 
 *                 type: string
 *               message: 
 *                 type: string
 */
router.post('/', async (req, res) => {
    const castle = new Castle({
        Name: req.body.Name,
        Location: req.body.Location,
        Status: req.body.Status,
        Founded: req.body.Founded,
        Type: req.body.Type,
        Religion: req.body.Religion,
        Founder: req.body.Religion | {},
        Rulers: req.body.Rulers | [],
        FandomURL: req.body.FandomURL | '',
        PlacesOfNote: req.body.PlacesOfNote | [],
    });

    try {
       const newCastle = await castle.save();
       res.status(201).json(newCastle);
    } catch (error) {
      res.status(500).json({ code: 500, message: e.message});
    }
})


/**
 * @swagger
 * /castles/one/{id}:
 *  delete:
 *    summary: Deletes castle with id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The castle Id
 *    responses:
 *      200:
 *        description: The Castle was deleted
 *      404:
 *        description: NotFOund
 *      500:
 *        description: Error
 *        content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               code: 
 *                 type: string
 *               message: 
 *                 type: string
 * 
 */
router.delete('/one/:id', async (req, res) => {
  const castle = await Castle.findById(req.params.id);
    if (castle) {
      try {
        await castle.remove()
        res.json({message: 'Success'})
      } catch (error) {
        res.status(500).json({ code: 500, message: e.message});
      }
    }
    else {
      res.status(404).json({ code: 404, message: 'Not Found'});
    }
})


/**
 * @swagger
 * /castles/one/{id}:
 *  put:
 *    summary: Upadates Castle
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The castle Id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Castle'
 *    responses:
 *      200:
 *        description: The castle
 *        content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Castle'
 *      500:
 *        description: Error
 *        content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               code: 
 *                 type: string
 *               message: 
 *                 type: string
 */
 router.put('/one/:id', async (req, res) => {
  const castle = await Castle.findById(req.params.id);
  castle = {
    Name: req.body.Name,
    Location: req.body.Location,
    Status: req.body.Status,
    Founded: req.body.Founded,
    Type: req.body.Type,
    Religion: req.body.Religion,
    Founder: req.body.Religion | {},
    Rulers: req.body.Rulers | [],
    FandomURL: req.body.FandomURL | '',
    PlacesOfNote: req.body.PlacesOfNote | [],
  };
  try {
     const updatedCastle = await castle.save();
     res.status(201).json(updatedCastle);
  } catch (error) {
    res.status(500).json({ code: 500, message: e.message});
  }
})


module.exports = router;