import Express from "express";
import { addComment, fetchComments, getAllPostsController, getSinglePost, postController } from "../controllers/postController.js";

const route = Express.Router();

route.post('/post', postController);
route.get('/getallposts', getAllPostsController);
route.get('/getpost/:id', getSinglePost);
route.post('/addcomment', addComment);
route.get('/comments/:id', fetchComments)

export default route;