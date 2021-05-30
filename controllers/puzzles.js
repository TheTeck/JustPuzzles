const Puzzle = require('../models/puzzle');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
    create,
    index,
    show,
    deletePuzzle
}

async function deletePuzzle(req, res){
    try {
        await Puzzle.findByIdAndDelete(req.params.id)
        res.json({ data: 'puzzle removed' })
    } catch(err){
        res.json({ error: err })
    }
}

function create(req, res){
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer }

        s3.upload(params, async function(err, data) {
            const puzzle = await Puzzle.create({
                width: +req.body.width,
                height: +req.body.height,
                month: +req.body.month,
                day: +req.body.day,
                year: +req.body.year, 
                photoUrl: data.Location
            })
            res.status(201).json({ puzzle })
        })
    } catch(err){
        console.log(err)
        res.json({ data: err })
    }
 }

async function index(req, res){
    try {
        const puzzles = await Puzzle.find({}).sort({ year: 1, month: 1, day: 1 })
        res.status(200).json({ puzzles })
    } catch(err){
        res.json(err)
    }
}

async function show(req, res) {
    try {
        const puzzle = await Puzzle.findOne({ _id: req.params.id })
        res.json({ puzzle })
    } catch (err) {
        res.json(err)
    }
}