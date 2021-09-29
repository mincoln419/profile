const express = require('express');
const router = express.Router();

//GET / 라우터
router.get('/', async (req, res) => {
    try{
        res.render('resume', 
        {title: 'Resume',
         menu: 'Resume'
        });
    }catch(err){
        console.err(err);
        next(err);
    }
});

module.exports = router;