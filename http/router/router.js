const express          = require('express');
const router           = express.Router();
const controller       = require('../controller');
const request          = require('../middleware/request');
const bookSearch       = require('../../src/book/searching-service');
const borrowerSearch   = require('../../src/borrower/searching-service');
const curriculumSearch = require('../../src/curriculum/searching-service');
const topicSearch      = require('../../src/topic/searching-service');
const feedbackSearch   = require('../../src/feedback/searching-service');

let bookController       = new controller.BookController();
let userController       = new controller.UserController();
let borrowerController   = new controller.BorrowerController();
let curriculumController = new controller.CurriculumController();
let topicController      = new controller.TopicController();
let feedbackController   = new controller.FeedbackController();

router.get('/books', (req, res, next) => {
    req.condition = new bookSearch.bookUndeleted();
    next();
}, bookController.search);

router.get('/search-basic', (req, res, next) => {
    req.condition = new bookSearch.bookKeyword(req.query.keyword);
    next();
}, bookController.search);

router.get('/search-advance', (req, res, next) => {
    req.condition = new bookSearch.bookAdvance(req.query.author, req.query.publisher);
    next();
}, bookController.search);

router.post('/book', request.book, bookController.create);
router.put('/book/:id', request.book, bookController.update);
router.delete('/book/:id', bookController.remove);


router.post('/user', request.user, userController.create);
router.put('/user/:user_name', request.user, userController.update);
router.delete('/user/:user_name', userController.remove);


router.get('/search-basic', (req, res, next) => {
    req.condition = new borrowerSearch.borrowerKeyword(req.query.keyword);
    next();
}, borrowerController.search);

router.get('/search-advance', (req, res, next) => {
    req.condition = new borrowerSearch.borrowerAdvance(req.query.user_name, req.query.name);
    next();
}, borrowerController.search);

router.get('/borrowers', (req, res, next) => {
    req.condition = new borrowerSearch.borrowerUndeleted();
    next();
}, borrowerController.search);

router.post('/borrower', request.borrower, borrowerController.create);
router.put('/borrower/:id', request.borrower, borrowerController.update);
router.delete('/borrower', borrowerController.remove);


router.get('/curriculums', (req, res, next) => {
    req.condition = new curriculumSearch.curriculumAll();
    next();
}, curriculumController.search);

router.get('/search-basic', (req, res, next) => {
    req.condition = new curriculumSearch.curriculumKeyword(req.query.keyword);
    next();
}, curriculumController.search);

router.get('/search-advance', (req, res, next) => {
    req.condition = new curriculumSearch.curriculumAdvance();
    next();
}, curriculumController.search);

router.post('/curriculum', request.curriculum, curriculumController.create);
router.put('/curriculum/:id', request.curriculum, curriculumController.update);


router.get('/topics', (req, res, next) => {
    req.condition = new topicSearch.topicUndeleted();
    next();
}, topicController.search);

router.get('/search-basic', (req, res, next) => {
    req.condition = new topicSearch.topicKeyword(req.query.keyword);
    next();
}, topicController.search);

router.get('/search-advance', (req, res, next) => {
    req.condition = new topicSearch.topicAdvance(req.query.name_user, req.query.title);
    next();
}, topicController.search);

router.post('/topic', request.topic, topicController.create);
router.put('/topic/:id', request.topic, topicController.update);
router.delete('/topic/:id', topicController.remove);


router.get('/feedbacks', (req, res, next) => {
    req.condition = new feedbackSearch.feedbackUndeleted();
    next();
},feedbackController.search);

router.get('/search-basic', (req, res, next) => {
    req.condition = new feedbackSearch.feedbackKeyword(req.query.keyword);
    next();
},feedbackController.search);

router.get('/search-advance', (req, res, next) => {
    req.condition = new feedbackSearch.feedbackAdvance(req.query.name_user_feedback, req.query.title);
    next();
},feedbackController.search);

router.post('/feedback', request.feedback, feedbackController.create);
router.put('/feedback/:id', request.feedback, feedbackController.update);
router.delete('/feedback/:id', feedbackController.remove);

module.exports = router;