const employee = require('../controllers/employee.controller');
const Router = require("express");

const routes = Router();

//dashboad
routes.get('/statusWiseCount', employee.statusWiseCount);
routes.get('/courseWiseCount', employee.courseWiseCount);
routes.get('/countryWiseCount', employee.countryWiseCount);
routes.get('/trainingProviderWiseCount', employee.trainingProviderWiseCount);



module.exports = routes