<template>
    <div class="newNotifListContainer">
        <newNotificationNotificationComponent
            v-for="(notification, index) in this.$store.getters['notifications/getNewNotifications']" v-bind:key="index"
            :header="notification.notification_header" :text="notification.notification_text"
            :typeName="$store.getters['notificationTypes/getTypeNameById'](notification.id_notification_type)"
            :senderName="$store.getters['employees/getEmployeeNameById'](notification.id_sender)"
            :sendTime="notification.time" :id_sended="notification.id_sended" @closeModal="closeModal"
            :buttons="$store.getters['notifications/getButtonsByNotifId'](notification.id_notification)"
            :reacted="notification.is_reacted" />
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
            notifications: [],
        }
    },
    async beforeCreate(){
        await this.$store.dispatch('notifications/getLastId', this.typeId);
    },
    methods: {
        closeModal(id_sended) {
            this.$store.commit('notifications/REMOVE_NOTIFICATION_NOTIFICATION', id_sended);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newNotifListContainer {
    right: 0;
    bottom: 0;
    width: auto;
    position: absolute;
    margin-right: 10px;
}
</style>