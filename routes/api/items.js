// @ts-ignore
const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth.js");

//Item Model
const Item = require('../../models/Item.js');


//@route    GET api/items
//$desc     Get All Items
//$access   Public
// @ts-ignore
router.get('/',(req,res)=>{
    Item.find()
    .sort({ date: -1})
    .then(items => res.json(items));
});

//@route    POST api/items
//$desc     Create A Item
//$access   Public
// @ts-ignore
router.post('/',auth,(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
    .then(item => res.json(item));
});

//@route    DELETE api/items/:id
//$desc     Delete a item
//$access   Public
// @ts-ignore
router.delete('/:id',auth,(req,res)=>{
    Item.findById(req.params.id)
    .then(item => {
        if(item)
        {
            item.remove()
            .then(()=>{
                res.json({success:true})
            });
        }
    })
    .catch(err =>{
       res.status(404).json({success:false}) 
    });
});

module.exports = router;