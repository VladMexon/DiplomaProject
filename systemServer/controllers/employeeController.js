import {getEmployee, newEmployee} from '../utils/dbFunctions.js';
class employeeController{
    getEmplyee(req, res){
        let id = req.query.id;
        getEmployee(id).then((employee) => {
            res.status(200).send(employee);
        });
    };
    
    newEmplyee(req, res){
        console.log(req.body)
        let employee = req.body;
        newEmployee(employee).then((data) => {
            res.status(200).send(data);
        })
    };
}

export default new employeeController();