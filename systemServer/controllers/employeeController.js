import {getEmployee, newEmployee} from '../utils/dbFunctions.js';
class employeeController{
    getEmplyee(req, res){
        let id = req.user.id;
        getEmployee(id).then((queryResult) => {
            if(queryResult.code == 0){
                res.status(200).send(queryResult.data);
            }
            else{
                res.status(500).send(queryResult);
            }
        });
    };
    
    newEmplyee(req, res){
        console.log(req.body)
        let employee = req.body;
        newEmployee(employee).then((queryResult) => {
            if(queryResult.code == 0){
                res.status(200).send(queryResult.data);
            }
            else{
                res.status(500).send(queryResult);
            }
        })
    };
}

export default new employeeController();