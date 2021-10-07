import Albums from '../../model/albums';
import Category from '../../model/categories';
// import firebase from 'firebase';
// const config =require('./config');
import formidable from 'formidable';
 export const albumsController = {
    getAlbums: (req,res)=>{
        Albums.find((err,albums)=>{
           if(err){
               console.log(err);
           }
           console.log(albums);
            res.render('admin/albums/list-albums',{
                albums:albums,
                // title: "albums"
            }
            )
        }).lean();
    },
    getAddAlbums: async (req,res)=>{
        const categories  = await Category.find({}).lean();
        console.log(categories);
        res.render('admin/albums/add-albums',{categories:categories})
     
    },
    addAlbums:async (req,res)=>{
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req,(err,fields,files)=>{
            console.log(fields);
            if(err){
               return res.status(400).json({
                    error:"Thêm không thành công"
                })
            }
            const {title,description,category} = fields;
            console.log(files);
            const firebaseApp =firebase.initializeApp(config.firebaseConfig);
            const productImage = files
            const storageRef = firebaseApp.storage().ref(`images/${productImage.name}`);
            // albums.save((err,data)=>{
            //     if(err){
            //         return res.status(400).json({
            //              error:"Thêm không thành công"
            //          })
            //      }
            //      res.json(data)
            // })
          
         });
    
         
    }
 }

