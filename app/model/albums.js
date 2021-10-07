import mongoose from 'mongoose'

const AlbumSechema =new mongoose.Schema({
    title:{
       type:String,
       require:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    img:{
        type:String
    },
    desc:{
        type:String,
        require:true
    }
},{timestamps:true});

module.exports = mongoose.model('Albums',AlbumSechema);