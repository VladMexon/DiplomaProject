<template>
    <div class="container">
        <h4 class="newNotifHeader">Новое уведомление <button class="closeButton" @click="closeModal(id_sended)"><img
                    src="../assets/close.png" width="15" height="15" alt="submit" /></button></h4>
        <h4>{{ header }}</h4>
        <p>{{ text }}</p>
        <p>Отправитель: {{ senderName }}</p>
        <p>Тип: {{ typeName }}</p>
        <p>Время отправки: {{ sendTime }}</p>
        <div class="reactionButtons" v-if="!reacted">
            <button v-for="(button, indexB) in buttons" @click="react(id_sended, button.id_send_notification)"
                v-bind:key="indexB">{{ button.button_text }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'newnNotificationNotificationComponent',
    props: ['header', 'text', 'typeName', 'senderName', 'sendTime', 'id_sended', 'buttons', 'reacted'],
    methods: {
        closeModal(id_sended) {
            this.$emit('closeModal', id_sended);
        },
        async react(id_sended, id_send_notification) {
            await this.$store.dispatch('notifications/react', {id_sended, id_send_notification});
            console.log('sended ' + id_send_notification);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newNotifHeader {
    text-align: left;
    margin-top: 0px;
    background-color: #b6b6b6;
    border-radius: 5px;
    margin-bottom: 0px;
    padding: 5px;
    margin: 2px;
}

.container {
    margin: 10px;
    background-color: #c7c7c7;
    border-radius: 10px;
    padding: 10px;
    width: 400px;
}

h4 {
    text-align: center;
    margin-top: 0px;
    margin: 2px;
}

p {
    background-color: #b6b6b6;
    padding: 5px;
    border-radius: 5px;
    margin: 2px;
}

.closeButton {
    float: right;
    border: 0;
    background: none;
}

.closeButton:hover {
    background-color: #cacaca;
}

.closeButton:active {
    background-color: #bebebe;
}
</style>