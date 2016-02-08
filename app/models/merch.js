import mongoose from 'mongoose';
import Recipe from './recipe';

// collection: 'merch' is required or mongoose will look for
// a collection called 'merchs' and return an empty array
const merchSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  category: {
    type: String
  },
  name: {
    type: String
  }
},
{
  collection: 'merch'
})

const Merch = mongoose.model('Merch', merchSchema);

export default Merch;
