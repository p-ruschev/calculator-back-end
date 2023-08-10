const Estimation = require("../models/Estimation");
const Formula = require("../models/Formula");

const options = {
    editVal: {
        runValidators: true,
    },
};

const createEstimation = (data) => Estimation.create(data);

const deleteEstimation = (id, creator) => Estimation.deleteOne({ _id: id, creator: creator });

const getAllEstimations = async (user) => Estimation.find({creator: user }).lean();

const updateEstimation = async (id, editData) => {
 await Estimation.findOneAndUpdate({ _id: id }, editData, options);

 const result = await Estimation.findOne({ _id: id });

 return result;
};

const createFormula = (data) => Formula.create(data);

const deleteFormula = (id, creator) => Formula.deleteOne({ _id: id, creator: creator });

const getAllFormulas = async (user) => Formula.find({creator: user }).lean();

const updateFormula = async (id, editData) => {
 await Formula.findOneAndUpdate({ _id: id }, editData, options);

 const result = await Formula.findOne({ _id: id });

 return result;
};


const calendarService = {
    createEstimation,
    getAllEstimations,
    deleteEstimation,
    updateEstimation,
    createFormula,
    deleteFormula,
    getAllFormulas,
    updateFormula
};

module.exports = calendarService;