const express = require('express');
const router = express.Router();

//GET / 라우터
router.get('/', async (req, res) => {
    try{
        res.render('index',
            {title: 'Welcome',
            menu: 'Home'
       });
    }catch(err){
        console.err(err);
        next(err);
    }
});

module.exports = router;