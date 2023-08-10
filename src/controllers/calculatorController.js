const router = require("express").Router();
const calculatorService = require("../services/calculatorService");
const { isAuth } = require("../middlewares/authMiddleware");

const getEstimations = async (req, res) => {
 try {
   const user = req.user ? req.user : null;
   const agenda = await calculatorService.getAllEstimations(user);
   res.status(200).json(agenda);
 } catch (error) {
   console.log(error);
 }
};

const initializeCreateEstimation = async (req, res) => {
 try {
   const data = {
     formula: req.body.formula,
     result: req.body.result,
     input: req.body.input,
     comment: req.body.comment,
   };
   const estimation = await calculatorService.createEstimation({
     ...data,
     creator: req.user._id,
   });
   res.status(200).json(estimation);
 } catch (error) {
   console.log(error);
 }
};

const initializeEditEstimation = async (req, res) => {
 try {
   const estimation = await calculatorService.updateEstimation(req.params.id, {
     ...req.body,
   });
   res.status(200).json({ estimation });
 } catch (error) {
   console.log(error);
 }
};

const initializeDeleteEstimation = async (req, res) => {
 try {
   const estimationId = req.params.id;
   const creator = req.user._id;
   await calculatorService.deleteEstimation(estimationId, creator);
   res.status(200).json({ deletion: true });
 } catch (error) {
   console.log(error);
 }
};

const getFormulas = async (req, res) => {
 try {
   const user = req.user ? req.user : null;
   const agenda = await calculatorService.getAllFormulas(user);
   res.status(200).json(agenda);
 } catch (error) {
   console.log(error);
 }
};

const initializeCreateFormula = async (req, res) => {
 try {
   const data = {
     formula: req.body.formula,
     input: req.body.input,
     variables: req.body.variables,
     comment: req.body.comment,
   };
   const formula = await calculatorService.createFormula({
     ...data,
     creator: req.user._id,
   });
   res.status(200).json(formula);
 } catch (error) {
   console.log(error);
 }
};

const initializeEditFormula= async (req, res) => {
 try {
   const formula = await calculatorService.updateFormula(req.params.id, {
     ...req.body,
   });
   res.status(200).json({ formula });
 } catch (error) {
   console.log(error);
 }
};

const initializeDeleteFormula = async (req, res) => {
 try {
   const formulaId = req.params.id;
   const creator = req.user._id;
   await calculatorService.deleteFormula(formulaId, creator);
   res.status(200).json({ deletion: true });
 } catch (error) {
   console.log(error);
 }
};

router.post("/estimations", isAuth, initializeCreateEstimation);
router.get("/estimations", isAuth, getEstimations);
router.put("/estimations/:id", isAuth, initializeEditEstimation);
router.delete("/estimations/:id", isAuth, initializeDeleteEstimation);
router.post("/formulas", isAuth, initializeCreateFormula);
router.get("/formulas", isAuth, getFormulas);
router.put("/formulas/:id", isAuth, initializeEditFormula);
router.delete("/formulas/:id", isAuth, initializeDeleteFormula);

module.exports = router;
