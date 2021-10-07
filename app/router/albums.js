import express from 'express';
import  {albumsController}  from '../controller/albums';
const router = express.Router();
    router.get('/',albumsController.homeAlbums)
    router.get('/albums',albumsController.getAlbums);
    router.post('/albums',albumsController.addAlbums)
module.exports = router