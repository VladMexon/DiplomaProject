<template>
    <div class="container">
        <h4 class="newNotifHeader">Новое уведомление <button class="closeButton" @click="closeModal(id_sended)"><img
                    src="../assets/close.png" width="15" height="15" alt="submit" /></button></h4>
        <h4>{{ header }}</h4>
        <pre v-if="text">{{ text }}</pre>
        <div class="reactionButtons" v-if="!reacted">
            <button v-for="(button, indexB) in buttons" @click="react(id_sended, button.id_send_notification)"
                v-bind:key="indexB">{{ button.button_text }}</button>
            <button @click="react(id_sended, null)" v-if="buttons.length == 0">Прочитано</button>
        </div>
        <div class="info">
            <span>{{ getTimeString() }}, {{ typeName.toLowerCase() }}</span>
            <span>{{ senderName }}</span>
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
            await this.$store.dispatch('notifications/react', { id_sended, id_send_notification });
            await this.$store.dispatch('notificationTypes/loadUnreactedCount');
            this.$emit('closeModal', id_sended);
            //console.log('sended ' + id_send_notification);
        },
        getTimeString() {
            let time = new Date(this.sendTime);
            var today = new Date();
            if (time.toDateString() == today.toDateString()) {
                return `${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}`;
            } else {
                return `${("0" + time.getDate()).slice(-2)}.${("0" + (time.getMonth() + 1)).slice(-2)}.${time.getFullYear()}`;
            }
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

.reactionButtons {
    display: flex;
    flex-direction: row;
    background-color: #b6b6b6;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
}

.reactionButtons button {
    margin: 5px;
    height: 25px;
    width: 100%;
    background-color: rgb(219, 219, 219);
    color: black;
    border: 2px solid #a0a0a0;
    border-radius: 5px;

}

.reactionButtons button:hover {
    background-color: rgb(207, 207, 207);
}

.reactionButtons button:active {
    background-color: rgb(189, 189, 189);
}

.info {
    background-color: #b6b6b6;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
    display: flex;
    justify-content: space-between;
}

pre {
    background-color: #b6b6b6;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
    font-size: 15px;
    white-space: pre-wrap;
}
</style>