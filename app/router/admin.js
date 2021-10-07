import express from 'express';
import {authJwt} from '../middlewares/authJwt.middlewares';
import {albumsController} from '../controller/admin/albums'

const router = express();
        router.get('/getAlbums',authJwt.verifyToken, albumsController.getAlbums)
        router.get('/addAlbum',albumsController.getAddAlbums)
        router.post('/addAlum',albumsController.addAlbums)
module.exports =router