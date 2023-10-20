
const ReviewModel = require("../model/reviewModel");
const get = () => {
    return ReviewModel.find({}, { __v:0});
};
const create = (date) => {
    const review = new ReviewModel(date);
    return review.save();
};
const getById = (id) => {
return ReviewModel.findOne({productId: id });
};


module.exports = {
    get,
    create,
    getById,
}