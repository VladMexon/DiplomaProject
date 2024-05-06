<template>
    <div class="sendedNotificationsPage">
        <leftMenuComponent />
        <div class="listContainer" ref="notifList" @scroll="listScroll">
            <div class="sendedNotification"
                v-for="(notification, indexN) in this.$store.getters['sendedNotifications/getData']"
                v-bind:key="indexN">
                <p class="notificationHeader">Заголовок: {{ notification.notification_header }}</p>
                <p class="notificationText">Текст: {{ notification.notification_text }}</p>
                <p class="notificationSendTime">Время отправки: {{ new Date(notification.send_time).toString() }}</p>
                <p class="notificationSendTime">Отреагировали: {{ notification.recipients_data.reduce((acc, curr) => acc
            + (curr.state ? 1 : 0), 0) }}/{{ notification.recipients_data.length }}</p>
                <div class="comments">
                    <div class="commentsHeader"><span>Комментарии
                            ({{ this.$store.getters['commentsStore/getCommentsCountById'](notification.id_notification)
                            }})</span><button @click="showComments(notification.id_notification)">Показать</button>
                    </div>
                    <div class="commentsContainer"
                        v-if="this.$store.getters['commentsStore/getUpdateIds'].includes(notification.id_notification)">
                        <div class="commentList">
                            <div class="comment"
                                v-for="(comment, indexC) in this.$store.getters['commentsStore/getCommentsByNotifId'](notification.id_notification)"
                                :key="indexC">
                                <p>{{ comment.text }}</p>
                                <p>{{ this.$store.getters['employees/getEmployeeNameById'](comment.id_author) }}</p>
                                <p>{{ new Date(comment.time).toString() }}</p>
                            </div>
                        </div>
                        <div class="controls">
                            <textarea v-model="commentText" placeholder="Введите комментарий"></textarea><button
                                class="commentSend" @click="send(notification.id_notification)">Отправить</button>
                        </div>
                    </div>
                </div>
                <button class="showDataButton" @click="showData(indexN)">Показать/Скрыть информацию о
                    получателях</button>
                <div class="recipientsData" v-if="showContentList.includes(indexN)">
                    <p v-for="(recipient, indexR) in notification.recipients_data" v-bind:key="indexR"> {{
            this.$store.getters['employees/getEmployeeNameById'](recipient.employee) }} <span
                            class="reacted" v-if="recipient.state">oтреагировал</span><span class="notReacted"
                            v-if="!recipient.state"> не
                            отреагировал</span> <span v-if="recipient.react_time">через {{ Math.round(((new
            Date(recipient.react_time)) - (new Date(notification.send_time))) / (60 * 1000)) }}мин. с
                            момента отправки</span></p>
                </div>
            </div>
        </div>
        <newNotificationsListComponent />
    </div>
</template>

<script>
import newNotificationsListComponent from '@/components/newNotificationsListComponent.vue';
import leftMenuComponent from '@/components/leftMenuComponent.vue';
export default {
    name: 'sendedNotificationsPage',
    components: {
        newNotificationsListComponent,
        leftMenuComponent,
    },
    data() {
        return {
            timer: null,
            showContentList: [],
            commentText: '',
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
        async showComments(id_notification) {
            if (!this.$store.getters['commentsStore/getUpdateIds'].includes(id_notification)) {
                await this.$store.dispatch('commentsStore/getComments', { id_notification: id_notification });
                this.$store.commit('commentsStore/ADD_UPDATE_ID', id_notification);
            } else {
                this.$store.commit('commentsStore/DELETE_UPDATE_ID', id_notification);
            }
        },
        async send(id_notification) {
            if (await this.$store.dispatch('commentsStore/sendComment', { id_notification, text: this.commentText, id_author: this.$store.getters['user/getUser'].id_employee }))
                this.commentText = '';
        },
        async listScroll() {
            const list = this.$refs.notifList;
            if (list) {
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
        }
    },
    created() {
        this.$store.dispatch('sendedNotifications/initData');
        this.timer = setInterval(async () => {
            if (await this.$store.dispatch('notifications/loadNewNotificationsNoId', this.currnentType)) {
                await this.$store.dispatch('notificationTypes/loadUnreactedCount')
            }
            await this.$store.dispatch('sendedNotifications/getUpdateData');
            await this.$store.dispatch('commentsStore/getCommentsCount', { notification_ids: this.$store.getters['sendedNotifications/getUpdateIds'] });
            await this.$store.dispatch('commentsStore/getNewComments');
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
    display: flex;
}

.listContainer {
    height: 100%;
    width: 100%;
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

.recipientsData {
    background-color: #a8a8a8;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
}

.commentsHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #b6b6b6;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
}

.controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #b6b6b6;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
}

.commentList {
    background-color: #b6b6b6;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
    height: 300px;
    overflow: auto;
}

.comments {
    background-color: #a5a4a4;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
}

textarea {
    width: 100%;
}

.comment {
    background-color: #a5a4a4;
    padding: 5px;
    border-radius: 5px;
    margin: 3px;
}
</style>