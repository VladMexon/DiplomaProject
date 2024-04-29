<template>
    <div class="sendedNotificationsPage">
        <div class="listContainer"  ref="notifList" @scroll="listScroll">
            <div class="sendedNotification"
                v-for="(notification, indexN) in this.$store.getters['sendedNotifications/getData']"
                v-bind:key="indexN">
                <p class="notificationHeader">Заголовок: {{ notification.notification_header }}</p>
                <p class="notificationText">Текст: {{ notification.notification_text }}</p>
                <button class="showDataButton" @click="showData(indexN)">Показать/Скрыть информацию о получателях</button>
                <div class="recipientsData" v-if="showContentList.includes(indexN)">
                    <p v-for="(recipient, indexR) in notification.recipients_data" v-bind:key="indexR"> {{
                    this.$store.getters['employees/getEmployeeNameById'](recipient.employee) }} <span
                            class="reacted" v-if="recipient.state">Отреагировал</span><span class="notReacted"
                            v-if="!recipient.state"> Не
                            отреагировал</span> </p>
                </div>
            </div>
        </div>
        <newNotificationsListComponent />
    </div>
</template>

<script>
import newNotificationsListComponent from '@/components/newNotificationsListComponent.vue';
export default {
    name: 'sendedNotificationsPage',
    components: {
        newNotificationsListComponent
    },
    data() {
        return {
            timer: null,
            showContentList: []
        }
    },
    methods: {
        mainPage() {
            this.$router.push({ name: "mainPage" });
        },
        showData(indexN) {
            if (!this.showContentList.includes(indexN)) {
                this.showContentList.push(indexN);
            } else {
                this.showContentList = this.showContentList.filter(elem => elem != indexN);
            }
        },
        async listScroll() {
            const list = this.$refs.notifList;
            if (Math.abs(list.scrollHeight - list.scrollTop - list.clientHeight) < 1) {
                console.log('Down');
                const scrollHeightBefore = list.scrollHeight; // Запоминаем текущую высоту скролла
                if (this.$store.dispatch('sendedNotifications/getPrevData')) {
                    this.$nextTick(() => {
                        const scrollHeightAfter = list.scrollHeight; // Получаем новую высоту скролла после подгрузки
                        const scrollDifference = scrollHeightAfter + scrollHeightBefore; // Вычисляем разницу
                        list.scrollTop = scrollDifference; // Устанавливаем скролл так, чтобы пользователь остался на том же месте
                    });
                }
            }
        }
    },
    created() {
        this.$store.dispatch('sendedNotifications/initData');
        this.timer = setInterval(async () => {
            if (await this.$store.dispatch('notifications/loadNewNotificationsNoId', this.currnentType)) {
                await this.$store.dispatch('notificationTypes/loadUnreactedCount')
            }
        }, 5000);
    },
    beforeUnmount() {
        clearInterval(this.timer)
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sendedNotificationsPage {
    height: calc(100% - 53px);
}

.listContainer {
    height: 100%;
    overflow: auto;
}

.sendedNotification {
    margin: 10px;
    background-color: #c7c7c7;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

p {
    background-color: #b6b6b6;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
}

.reacted {
    color: green;
}

.notReacted {
    color: red;
}

.recipientsData{
    background-color: #a8a8a8;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
}
</style>