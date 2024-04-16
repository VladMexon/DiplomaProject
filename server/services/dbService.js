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

    async newNotification(notificationHeader, notificationText, employeeId, isDelayed, sendDate, notificationType, isDrafted){
        return db.one({
            name: 'newNotification',
            text: 'INSERT INTO system.notifications(notification_text, id_author, delayed, send_date, id_notification_type, drafted, notification_header) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id_notification',
            values: [notificationText, employeeId, isDelayed, sendDate, notificationType, isDrafted, notificationHeader]
        });
    }

    async newRecipient(idNotification, idRecipient){
        return db.none({
            name: 'newRecipient',
            text: 'INSERT INTO system.notification_recipients(id_notification, id_employee) VALUES($1, $2)',
            values: [idNotification, idRecipient]
        });
    }


    async newSendedNotification(idNotification, idSender, idRecipient){
        return db.none({
            name: 'newSendedNotification',
            text: 'INSERT INTO system.sended_notifications(id_notification, id_sender, id_recipient) VALUES($1, $2, $3)',
            values: [idNotification, idSender, idRecipient]
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
        return db.oneOrNone({
            name: 'getRefreshToken',
            text: 'SELECT id_employee FROM system.refresh_tokens WHERE refresh_token = $1',
            values: [refreshToken]
        });
    }

    async  getPrevNotifications(recipientId, lastId, typeId){
        return db.manyOrNone({
            name: 'getPrevNotifications',
            text: 'SELECT n.id_notification, n.id_notification_type, n.notification_text, n.notification_header, sn.id_sended, sn.id_sender, sn.is_reacted, sn.time FROM system.notifications AS n JOIN system.sended_notifications AS sn ON n.id_notification = sn.id_notification WHERE sn.id_recipient = $1 AND sn.id_sended < $2 AND n.id_notification_type = $3 ORDER BY n.id_notification DESC LIMIT 10;',
            values: [recipientId, lastId, typeId]
        });
    }

    async  getNewNotificationsNoId(recipientId, lastId){
        return db.manyOrNone({
            name: 'getNewNotificationsNoId',
            text: 'SELECT n.id_notification, n.id_notification_type, n.notification_text, n.notification_header, sn.id_sended, sn.id_sender, sn.is_reacted, sn.time FROM system.notifications AS n JOIN system.sended_notifications AS sn ON n.id_notification = sn.id_notification WHERE sn.id_recipient = $1 AND sn.id_sended > $2 ORDER BY n.id_notification DESC LIMIT 10;',
            values: [recipientId, lastId]
        });
    }

    async  getPrevNotificationsNoId(recipientId, lastId){
        return db.manyOrNone({
            name: 'getPrevNotificationsNoId',
            text: 'SELECT n.id_notification, n.id_notification_type, n.notification_text, n.notification_header, sn.id_sended, sn.id_sender, sn.is_reacted, sn.time FROM system.notifications AS n JOIN system.sended_notifications AS sn ON n.id_notification = sn.id_notification WHERE sn.id_recipient = $1 AND sn.id_sended < $2 ORDER BY n.id_notification DESC LIMIT 10;',
            values: [recipientId, lastId]
        });
    }

    async  getNewNotifications(recipientId, lastId, typeId){
        return db.manyOrNone({
            name: 'getNewNotifications',
            text: 'SELECT n.id_notification, n.id_notification_type, n.notification_text, n.notification_header, sn.id_sended, sn.id_sender, sn.is_reacted, sn.time FROM system.notifications AS n JOIN system.sended_notifications AS sn ON n.id_notification = sn.id_notification WHERE sn.id_recipient = $1 AND sn.id_sended > $2 AND n.id_notification_type = $3 ORDER BY n.id_notification DESC LIMIT 10;',
            values: [recipientId, lastId, typeId]
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

    async getAllNotificationTypes(){
        return db.many({
            name: 'getAllNotificationTypes',
            text: 'SELECT * FROM system.notification_types',
            values: []
        });
    }

    async getPositions(){
        return db.many({
            name: 'getPositions',
            text: 'SELECT * FROM system.positions',
            values: []
        });
    }

    async getDepartmrnts(){
        return db.many({
            name: 'getDepartmrnts',
            text: 'SELECT * FROM system.departments',
            values: []
        });
    }

    async getLastId(recipientId){
        return db.oneOrNone({
            name: 'getLastId',
            text: 'SELECT id_sended FROM system.sended_notifications WHERE id_recipient = $1 ORDER BY id_sended DESC LIMIT 1;',
            values: [recipientId]
        });
    }

    async newButton(buttonText, idNotification, idSendNotification){
        return db.none({
            name: 'newButton',
            text: 'INSERT INTO system.buttons(button_text, id_notification, id_send_notification) VALUES($1, $2, $3)',
            values: [buttonText, idNotification, idSendNotification]
        });
    }

    async getButtons(ids){
        return db.manyOrNone(
            'SELECT * FROM system.buttons WHERE id_notification IN ($1:csv)', [ids]
        );
    }

    async setReacted(id_sended){
        return db.none({
            name: 'setReacted',
            text: 'UPDATE system.sended_notifications SET is_reacted = true WHERE id_sended = $1',
            values: [id_sended]
        });
    }

    async getRecipients(id_notificaiton){
        return db.manyOrNone({
            name: 'getRecipients',
            text: 'SELECT id_employee FROM system.notification_recipients WHERE id_notification = $1 ',
            values: [id_notificaiton]
        });
    }
}

module.exports = new authService();

