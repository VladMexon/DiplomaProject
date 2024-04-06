<template>
    <div class="newNotifListContainer">
        <newNotificationNotificationComponent v-for="(notification, index) in notifications" v-bind:key="index"
            :header="notification.notification_header" :text="notification.notification_text"
            :typeName="$store.getters['notificationTypes/getTypeNameById'](notification.id_notification_type)"
            :senderName="$store.getters['employees/getEmployeeNameById'](notification.id_sender)"
            :sendTime="notification.time"
            :id_sended="notification.id_sended" @closeModal="closeModal"/>
    </div>
</template>

<script>
import newNotificationNotificationComponent from './newNotificationNotificationComponent.vue';
export default {
    name: 'newnNotificationListComponent',
    components: {
        newNotificationNotificationComponent,
    },
    data() {
        return {
            notifications: []
        }
    },
    methods: {
        update() {
            this.notifications.push(...this.$store.getters['notifications/getNewNotifications']);
        },
        closeModal(id_sended){
            this.notifications = this.notifications.filter((item) => item.id_sended != id_sended);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newNotifListContainer {
    right: 0;
    bottom: 0;
    width:auto;
    position: absolute;
    margin-right: 10px;
}
</style>