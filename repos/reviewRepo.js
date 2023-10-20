
const ReviewModel = require("../model/reviewModel");
const get = () => {
    return ReviewModel.find({}, { __v:0});
};
const create = (date) => {
    const review = new ReviewModel(date);
    return review.save();
};
module.exports = {
    get,
    create,
}