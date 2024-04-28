<template>
    <div class="sendedNotificationsPage">

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
            timer: null
        }
    },
    methods: {
        mainPage() {
            this.$router.push({ name: "mainPage" });
        }
    },
    created() {
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
.registerPage {
    height: calc(100% - 53px);
}

</style>