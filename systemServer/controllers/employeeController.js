import {getAllEmployees} from '../utils/dbFunctions.js';
class employeeController{
    getEmplyees(req, res){
        getAllEmployees().then((queryResult) => {
            if(queryResult.code == 0){
                res.status(200).send(queryResult.data);
            }
            else{
                res.status(500).send(queryResult);
            }
        });
    };
}

export default new employeeController();