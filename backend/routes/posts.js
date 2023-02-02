const  router= require("express").Router();
const  Post= require("../models/Post");
const User = require("../models/User");

//Create
router.post("/", async(req,res) => {
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Update
router.put("/:id" , async(req , res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                    $set: req.body,
                    },
                    {new: true}
                );
                res.status(200).json(updatedPost);
            } 
            catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can only update your posts");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id" , async(req , res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                await post.delete();
                req.status(200).json("Post has been deleted!");
            } 
            catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(400).json("You can delete only your posts");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET
router.get("/:id", async(req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET all posts
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        //get all posts of a specific user
        posts = await Post.find({ username });
      } else if (catName) {
        //get all posts of a specific category
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        //get all posts
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;
