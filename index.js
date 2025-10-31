const express = require("express");
const app = express();

const {initiallizeDatabase}=require("./db/db.connect");
const Recipe = require("./models/recipe.models");

app.use(express.json())

initiallizeDatabase();

//qs-1 & 2 successfully done as create schema and db connection.

//qs-3 & 4 & 5 >Create an API with route "/recipes" to create a new recipe in the recipes database
async function createRecipe(newRecipe){
    try {
        const recipe = new Recipe(newRecipe);
        const saveRecipe = await recipe.save();
        return saveRecipe;
    } catch (error) {
        throw error;
    }
}
app.post("/recipes",async(req,res)=>{
    try{
        const savedRecipe = await createRecipe(req.body);
        res.status(201).json({message:"recipe added successfully", savedRecipe:savedRecipe})
    }catch(error){
        res.status(500).json({error:"Failed to add recipe"});
    }
})

//qs-6. Create an API to get all the recipes in the database as a response. Make sure to handle errors properly.
async function readAllRecipes(){
    try {
        const findAllRecipe = await Recipe.find();
        return findAllRecipe;
    } catch (error) {
        console.log(error)
    }
}
app.get("/recipes",async(req,res)=>{
    try {
        const recipe = await readAllRecipes();
        if(recipe.length != 0){
            res.json(recipe);
        }else{
            res.status(404).json({error:"recipes doesn't found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to add recipe"});
    }
})

//qs-7.Create an API to get a recipe's details by its title.
async function readByTitle(recipeTitle) {
    try {
        const findRecipeByTitle = await Recipe.find({title:recipeTitle});
        return findRecipeByTitle;
    } catch (error) {
        console.log(error);
    }
}
app.get("/recipes/:Rtitle",async(req,res)=>{
    try {
        const recipe = await readByTitle(req.params.Rtitle);
        if(recipe){
            res.json(recipe);
        }else{
            res.status(404).json({error:"recipes doesn't found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to add recipe"});
    }
})

//qs-8. Create an API to get details of all the recipes by an author
async function readByAuthor(recipeAuthor) {
    try {
        const findByAuthor = await Recipe.find({author: recipeAuthor});
        return findByAuthor;
    } catch (error) {
        console.log(error)
    }
}
app.get("/recipes/author/:authorName",async(req,res)=>{
    try {
        const recipe = await readByAuthor(req.params.authorName);
        if(recipe){
            res.json(recipe);
        }else{
            res.status(404).json({error:"recipes doesn't found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to add recipe"});
    }
})

//qs-9. Create an API to get all the recipes that are of "Easy" difficulty level.
async function readByDiff(difficultyLevel) {
    try {
        const findRecByDif = await Recipe.find({difficulty:difficultyLevel});
        return findRecByDif;
    } catch (error) {
        console.log(error)
    }
}
app.get("/recipes/difficulty/:diffLevel",async(req,res)=>{
    try {
        const recipe = await readByDiff(req.params.diffLevel);
        if(recipe){
            res.json(recipe)
        }else{
            res.status(404).json({error:"recipes doesn't found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to add recipe"});
    }
})

//qs-10. Create an API to update a recipe's difficulty level with the help of its id.
//Update the difficulty of "Spaghetti Carbonara" from "Intermediate" to "Easy".
//Send an error message "Recipe not found" if the recipe is not found. Make sure to handle errors properly.
async function updateRecipeById(recipeId,dataToUpdate) {
    try {
        const updateRec = await Recipe.findByIdAndUpdate(recipeId,dataToUpdate,{new:true})
        return updateRec;
    } catch (error) {
        console.log(error);
    }
}
app.post("/recipes/:recId",async(req,res)=>{
    try {
        const updatedRec = await updateRecipeById(req.params.recId,req.body);
        res.status(201).json({message:"recipe data updated successfully",updatedRec: updatedRec})
    } catch (error) {
        res.status(500).json({error:"Failed to add recipe"});
    }
})

//qs-11. Create an API to update a recipe's prep time and cook time with the help of its title.
//Update the details of the recipe "Chicken Tikka Masala".
//Send an error message "Recipe not found" if the recipe is not found. Make sure to handle errors properly.
async function updateByTitle(recTitle,dataToUpdate) {
    try {
        const updateRec = await Recipe.findOneAndUpdate({title:recTitle},dataToUpdate,{new:true});
        return updateRec;
    } catch (error) {
        console.log(error)
    }   
}
app.post("/recipes/title/:recTitle",async(req,res)=>{
    try {
        const updatedRecipe = await updateByTitle(req.params.recTitle,req.body);
        res.status(201).json({message:"recipe data updated successfully", updatedRecipe:updatedRecipe})
    } catch (error) {
        res.status(500).json({error:"Failed to add recipe"});
    }
})
//qs-12.Create an API to delete a recipe with the help of a recipe id.
//Send an error message "Recipe not found" if the recipe does not exist. 
//Make sure to handle errors proper
async function deleteRecipeById(recId) {
    try {
        const deleteRec = await Recipe.findByIdAndDelete(recId)
        return deleteRec;
    } catch (error) {
        console.log(error)
    }
}
app.delete("/recipes/:recId",async(req,res)=>{
    try {
        const deletedRec = await deleteRecipeById(req.params.recId);
        if(deletedRec){
            res.status(201).json({message:"recipe data deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to add recipe"});
    }
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})