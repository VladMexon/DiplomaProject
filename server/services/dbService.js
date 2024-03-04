const db = require('./dbContext.js');

class authService{
    async newEmployee(employee){
        return db.one({
            name: 'newEmployee',
            text: 'INSERT INTO system.employees(first_name, second_name, middle_name, id_position, id_department) VALUES($1, $2, $3, $4, $5) RETURNING id_employee',
            values: [employee.first_name, employee.second_name, employee.middle_name, employee.id_position, employee.id_department]
        });
    }

    async registerEmployee(user_name, password, id_employee, roles){
        return db.one({
            name: 'registerEmployee',
            text: 'INSERT INTO system.credentials(user_name, password, id_employee, roles) VALUES($1, $2, $3, $4) RETURNING id_cred',
            values: [user_name, password, id_employee, JSON.stringify(roles)]
        });
    }
    
    async setRefreshToken(refreshToken, employeeId){
        return db.one({
            name: 'setRefreshToken',
            text: 'INSERT INTO system.refresh_tokens(refresh_token, id_employee) VALUES($1, $2)',
            values: [refreshToken, employeeId]
        });
    }

    async deleteRefreshToken(refreshToken){
        return db.none({
            name: 'deleteRefreshToken',
            text: 'DELETE FROM system.refresh_tokens WHERE refresh_token = $1',
            values: [refreshToken]
        });
    }

    async  getRefreshToken(refreshToken){
        return db.one({
            name: 'findEmployee',
            text: 'SELECT id_employee FROM system.refresh_tokens WHERE refresh_token = $1',
            values: [refreshToken]
        });
    }
    
    async getCredentials(user_name){
        return db.one({
            name: 'getCredInfo',
            text: 'SELECT password, id_employee, valid, roles  FROM system.credentials WHERE user_name = $1',
            values: [user_name]
        });
    }
    
    async  getEmployee(id){
        return db.one({
            name: 'findEmployee',
            text: 'SELECT * FROM system.employees WHERE id_employee = $1',
            values: [id]
        });
    }
    
    async getAllEmployees(){
        return db.many({
            name: 'getAllEmployees',
            text: 'SELECT * FROM system.employees',
            values: []
        });
    }
}

module.exports = new authService();

