let express = require('express');
let app = express();

const employeeRouter = require('./app/routes/employee.route')
const dashboadRouter = require('./app/routes/dashboard.route')

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

app.use('/employee',employeeRouter) 
app.use('/dashboad',dashboadRouter)


app.get('/', (req, res) => {
    res.json({
        "message": "Backend Connected"
    });
});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
