import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  heat: {
    type: String
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
