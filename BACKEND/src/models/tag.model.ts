import { Document, Schema, model } from 'mongoose';
export interface ITag extends Document{
    name:string;
    color:string;
    description:string
}
const TagSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    color:{
        type:String,
        default:"green"
    }
})
const Tag=model<ITag>("Tag",TagSchema)
export default Tag