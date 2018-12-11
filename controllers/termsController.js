var express = require('express');
var router = express.Router();

var term = require('../models/term');

router.get('/', term.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id/edit', term.find, rendeEdit);
router.get('/:id', term.find, renderShow);
router.post('/', term.create, redirectShow);
router.delete('/:id', term.delete, redirectIndex);
router.put('/:id', term.update, redirectShow);

function renderIndex(req, res){
    var mustacheData = res.locals.term;
    console.log(mustacheData);
    res.render('./terms/index', mustacheData);
}
  
function renderShow(req,res){
    var mustacheData = res.locals.term;
    res.render('./terms/show', mustacheData);
}

function renderNew(req, res){
    res.render('./terms/new');
}

function redirectShow(req, res) {
    console.log(req.body);
    res.redirect(`/terms/${res.locals.term_id}`);
}

function rendeEdit(req,res){
    var dataVariables = res.locals.term;
    res.render('./terms/edit', dataVariables);
}

function redirectIndex(req,res){
    res.redirect('/terms');
}
  
module.exports = router;