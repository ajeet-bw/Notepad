const router = require('express').Router();
const actrl = require('./accountController');

router.post('/POST/signup', actrl.signup);
router.post('/POST/signin', actrl.signin);
router.post('/POST/note', actrl.note);
router.post('/GET/notes', actrl.notes);
module.exports = router;