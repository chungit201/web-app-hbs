import Albums from '../model/albums'
export const albumsController = {
    homeAlbums: async(req,res)=>{
        res.render('home')
    },
    getAlbums: async (req,res)=>{
        const albums =await Albums.find().lean();
        res.render('albums',{
            data:albums
        });
    },
    addAlbums: async(req,res)=>{
        let album = new Albums(req.body);
        album.save((err,data)=>{
            if(err){
                console.log(err);
            }
            res.json(data)
        })
    }
}
