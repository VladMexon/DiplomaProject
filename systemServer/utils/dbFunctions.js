import {db} from './dbContext.js';

const goodCode = function(queryResult){
    return {
        code: 0,
        message: 'This is fine',
        data: queryResult
    }
}

const badCode = function(error){
    return {
        code: error.code,
        message: error.message
    }
}

const processQueryResult = function(result){
    return result.then(data => {
        return goodCode(data);
    }).catch(error => {
        //console.error(error);
        return badCode(error);
    });
}

export const newEmployee = function(employee){
    return processQueryResult(db.one({
        name: 'newEmployee',
        text: 'INSERT INTO system.employees(first_name, second_name, middle_name, id_position, id_department) VALUES($1, $2, $3, $4, $5) RETURNING id_employee',
        values: [employee.first_name, employee.second_name, employee.middle_name, employee.id_position, employee.id_department]
    }));
}

export const getEmployee = function(id){
    return processQueryResult(db.one({
        name: 'findEmployee',
        text: 'SELECT * FROM system.employees WHERE id_employee = $1',
        values: [id]
    }));
}

export const getCredentialsInfo = function(user_name){
    return processQueryResult(db.one({
        name: 'getCredInfo',
        text: 'SELECT * FROM system.credentials WHERE user_name = $1',
        values: [user_name]
    }));
}

export const register = function(user_name, password, id_employee, roles){
    return processQueryResult(db.one({
        name: 'registerEmployee',
        text: 'INSERT INTO system.credentials(user_name, password, id_employee, roles) VALUES($1, $2, $3, $4) RETURNING id_cred',
        values: [user_name, password, id_employee, JSON.stringify(roles)]
    }));
}

export const getAllEmployees = function(){
    return processQueryResult(db.many({
        name: 'getAllEmployees',
        text: 'SELECT * FROM system.employees',
        values: []
    }));
}
