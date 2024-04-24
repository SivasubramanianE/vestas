const employee = require("../controllers/employee.controller");
const Router = require("express");

const routes = Router();

//Employee
routes.get("/list", employee.getEmployeeList);
routes.post("/add", employee.addEmployee);
routes.post("/edit-record/delegateId", employee.updateRecordsBydelegateId);
routes.post("/delete", employee.deleteEmployee);

module.exports = routes;
