const { constants } = require('buffer');
const fs = require('fs');

function getEmployeeData() {
  try {
    return JSON.parse(fs.readFileSync('empRec.json', 'utf8'));
  } catch (error) {
    console.error('Error reading employee data:', error);
  }
}

function writeEmployeeData(data) {
  try {
    fs.writeFileSync('empRec.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error reading employee data:', error);
  }
}

function getEmployeeRelation() {
  try {
    return JSON.parse(fs.readFileSync('empId.json', 'utf8'));
  } catch (error) {
    console.error('Error reading employee data:', error);
  }
}


module.exports = {
  getEmployeeList: (req, res) => {
    const empRelation =getEmployeeRelation();
    let employeeData = getEmployeeData();
    if (employeeData) {
      
      
      employeeData = employeeData.map(delegateData => {
        const eId = empRelation.find(empDetails => empDetails.delegate_id === delegateData.delegate_id)?.employee_id;
        if (eId) {
          delegateData.employee_id = eId;
        }
        return delegateData;
      });
      
  
      res.send(employeeData);
    } else {
      res.status(500).send({ error: "Failed to retrieve employee data" });
    }
  },

  addEmployee: (req, res) => {
    const employeeData = getEmployeeData();
    if (req.body) {
      employeeData.push(req.body);
      writeEmployeeData(employeeData);
      res.send({res : "employee added Successfully"});
    } else {
      res.status(500).send({ error: "Failed to add employee data" });
    }
  },

  updateRecordsBydelegateId: (req, res) => {
    const employeeData = getEmployeeData();
    const delegateId = req.body.delegate_id;

    if (delegateId) {
      const employeeIndex = employeeData.findIndex(
        (employee) => employee.delegate_id === req.body.delegate_id
      );
      if (employeeIndex === -1) {
        return res.status(404).send({ error: "Employee not found" });
      }
      employeeData[employeeIndex] = {
        ...employeeData[employeeIndex],
        ...req.body,
      };
      writeEmployeeData(employeeData);
      res.send({res: "employee record update Successfully"});
    } else {
      res.status(500).send({ error: "Failed to add employee data" });
    }
  },

  deleteEmployee: (req, res) => {
    const employeeData = getEmployeeData();

    const delegateId = req.body.delegate_id;

    const employeeIndex = employeeData.findIndex(
      (employee) => employee.delegate_id === delegateId
    );

    if (employeeIndex === -1) {
      return res.status(404).send({ error: "Employee not found" });
    }
    employeeData.splice(employeeIndex, 1);

    writeEmployeeData(employeeData);

    res.send({res:"Employee record deleted successfully"});
  },

  statusWiseCount: (req, res) => {
    const employeeData = getEmployeeData();

    const groupedByStatus = {};
    for (const delegate of employeeData) {
      for (const record of delegate["records"]) {
        const status = record["status"];
        groupedByStatus[status] = groupedByStatus[status] || [];
        groupedByStatus[status].push(record);
      }
    }
    let totalStatus = [];
    for (const status in groupedByStatus) {
      totalStatus.push({
        id: status,
        nested: { value: groupedByStatus[status].length },
      });
    }

    res.send(totalStatus);
  },

  courseWiseCount: (req, res) => {
    const employeeData = getEmployeeData();

    const groupedBycourse = {};
    for (const delegate of employeeData) {
      for (const record of delegate["records"]) {
        const course_code = record["course_code"];

        groupedBycourse[course_code] = groupedBycourse[course_code] || [];
        groupedBycourse[course_code].push(record);
      }
    }
    let totalCourseCount= [];
    for (const course_code in groupedBycourse) {
      totalCourseCount.push({
        id: course_code,
        nested: { value: groupedBycourse[course_code].length },
      });
    }

    res.send(totalCourseCount);
  },

  countryWiseCount: (req, res) => {
    const employeeData = getEmployeeData();

    const groupedBycountry = {};
    for (const delegate of employeeData) {
      for (const record of delegate["records"]) {
        const country = record["country"];

        groupedBycountry[country] = groupedBycountry[country] || [];
        groupedBycountry[country].push(record);
      }
    }
    let totalCountry = [];
    for (const country in groupedBycountry) {
      totalCountry.push({
        id: country,
        nested: { value: groupedBycountry[country].length },
      });
    }

    res.send(totalCountry);
  },

  trainingProviderWiseCount: (req, res) => {
    const employeeData = getEmployeeData();

    const groupedBycountry = {};
    for (const delegate of employeeData) {
      for (const record of delegate["records"]) {
        const training_provider = record["training_provider"];

        groupedBycountry[training_provider] = groupedBycountry[training_provider] || [];
        groupedBycountry[training_provider].push(record);
      }
    }
    let totalTrainingProvider = [];
    for (const training_provider in groupedBycountry) {
      totalTrainingProvider.push({
        id: training_provider,
        nested: { value: groupedBycountry[training_provider].length },
      });
    }

    res.send(totalTrainingProvider);
  },
  
};
