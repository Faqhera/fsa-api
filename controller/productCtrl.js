const productRepo = require("../repos/productRepo");
const reviewRepo = require("../repos/reviewRepo");
const logger = require("../utils/appLogger");
const getAll = async(req,res) => {
    try{
        const search = req.query.search;
        const sort = req.query.sort;
        const dir = req.query.dir;
        const page = +req.params.page;
        const pageSize =+req.params.size;
        const products = await productRepo.get(page,pageSize,sort,dir,search);
       logger.info ('Get all products request made');
        res.status(200).json(products);
    } 
    catch (error) {
        logger.error("some error occured!");
console.error(error);
res.status(500).send("Internal Server Error");
}
};

const addProduct = async(req,res) => {
    try{
        const data = req.body;
        await productRepo.create(data);
        res.status(201).send("Product Added!");
    } catch (error) {
console.error(error);
res.status(500).send("Internal Server Error");
}
};

const singleProduct = async(req,res) => {
    try{
        const id = req.params.id;
        const product = await productRepo.getById(id);
        const reviews = await reviewRepo.getById(id);

        const data ={
product,
reviews,
        };
        /*const data = product.toJSON();
        data.reviews = reviews;*/ 
        
        res.status(200).json(data);
    } catch (error) {
console.error(error);
res.status(500).send("Internal Server Error");
}
};

const fullUpdate = async(req,res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        await productRepo.put (id,data);
        res.status(204).send("Updated!");
    } catch (err) {
res.status(500);
console.error(err);
res.send("Internal Server Error");
    }
};

const partialUpdate = async(req,res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        await productRepo.put (id,data);
        res.status(204).send("Updated!");
    } catch (err) {
res.status(500);
console.error(err);
res.send("Internal Server Error");
    }
};

const deleteProduct = async(req,res) => {
    try{
        const id = req.params.id;
        await productRepo. remove(id);
        res.status(204).send("Deleted!");
    } catch (err) {
res.status(500);
console.error(err);
res.send("Internal Server Error");
    }
};

module.exports = {
    getAll,
    addProduct,
    singleProduct,
    fullUpdate,
    partialUpdate,
    deleteProduct,
};