<template>
    <div class="registerPage">
        <leftMenuComponent />
        <div class="container">
            <div class="label">
                <h1>Регистация новых сотрудников</h1>
            </div>
            <div class="registerForm">
                <p class="error" v-if="v$.department.$error">Укажите департамент</p>
                <label>
                    Отдел:
                    <select name="departmentSelection" v-model="department">
                        <option v-bind:value="department.id_department"
                            v-for="(department, index) in $store.getters['departments/getDepartments']"
                            v-bind:key="index">{{ department.department_name }}</option>
                    </select>
                </label>
                <p class="error" v-if="v$.position.$error">Укажите должность</p>
                <label>
                    Должность:
                    <select name="positionSelection" v-model="position">
                        <option v-bind:value="position.id_position"
                            v-for="(position, index) in $store.getters['positions/getPositions']" v-bind:key="index">{{
                    position.position_name }}</option>
                    </select>
                </label>
                <p class="error" v-if="v$.firstName.$error">Укажите имя</p>
                <label>
                    Имя:
                    <input type="text" placeholder="Введите имя" v-model="firstName" />
                </label>
                <p class="error" v-if="v$.secondName.$error">Укажите фамилию</p>
                <label>
                    Фамилия:
                    <input type="text" placeholder="Введите фамилию" v-model="secondName" />
                </label>
                <label>
                    Отчество:
                    <input type="text" placeholder="Введите отчество" v-model="thridName" />
                </label>
                <p class="error" v-if="v$.emailValue.$error">Укажите правильную электронную почту</p>
                <label>
                    Элктронная почта:
                    <input type="text" placeholder="Введите электронную почту" v-model="emailValue" />
                </label>
                <button class="send" @click="send">Отправить</button>
            </div>
        </div>
        <newNotificationsListComponent />


    </div>
</template>

<script>
import newNotificationsListComponent from '@/components/newNotificationsListComponent.vue';
import leftMenuComponent from '@/components/leftMenuComponent.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
    name: 'registerPage',
    components: {
        newNotificationsListComponent,
        leftMenuComponent,
    },
    setup() {
        return ({ v$: useVuelidate() })
    },
    data() {
        return {
            firstName: null,
            secondName: null,
            thridName: null,
            position: null,
            department: null,
            emailValue: null,
            timer: null
        }
    },
    methods: {
        async send() {
            this.v$.$touch()
            if (!this.v$.$error) {
                try {
                    let payload = { first_name: this.firstName, second_name: this.secondName, middle_name: this.thridName, id_position: this.position, id_department: this.department, email: this.emailValue };
                    const result = await this.$api.auth.register(payload);
                    if (result === 'ok') {
                        alert('Пользователь зарегистрирован');
                    } else {
                        alert('Этот email уже привязан к учетной записи');
                    }
                } catch (e) {
                    console.log(e);
                }
            }
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
    validations: {
        firstName: { required },
        secondName: { required },
        position: { required },
        department: { required },
        emailValue: { required, email },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registerPage {
    height: calc(100% - 53px);
    display: flex;
}

.container{
width: 100%;
}

.registerForm {
    display: flex;
    flex-direction: column;
    background-color: #cccccc;
    padding: 10px;
}

label {
    background-color: #bdbdbd;
    border-radius: 8px;
    padding: 10px;
    margin: 3px;
}

h1 {
    margin: 0;

}

.label {
    text-align: center;
    background-color: #c7c7c7;
    border-radius: 10px;
    padding: 10px;
}

.error {
    font-size: 12px;
    color: red;
    margin: 0px;
    margin-top: 5px;
}
</style>