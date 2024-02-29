import {db} from './dbContext.js';

const goodCode = function(queryResult){
    return {
        code: 1,
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
        console.error(error);
        return badCode(error);
    });
}

export const newEmployee = function(employee){
    return processQueryResult(db.one({
        name: 'newEmployee',
        text: 'INSERT INTO inner_bd.employees(first_name, second_name, middle_name, id_position, id_department) VALUES($1, $2, $3, $4, $5) RETURNING id_employee',
        values: [employee.first_name, employee.second_name, employee.middle_name, employee.id_position, employee.id_department]
    }));
}

export const getEmployee = function(id){
    return processQueryResult(db.one({
        name: 'findEmplyee',
        text: 'SELECT * FROM inner_bd.employees WHERE id_employee = $1',
        values: [id]
    }));
}