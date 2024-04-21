<template>
    <div class="registerPage">
        <div class="container">
            <div class="registerForm">
                <label>
                    Отдел:
                    <select name="departmentSelection" v-model="department">
                        <option v-bind:value="department.id_department"
                            v-for="(department, index) in $store.getters['departments/getDepartments']"
                            v-bind:key="index">{{ department.department_name }}</option>
                    </select>
                </label>
                <label>
                    Должность:
                    <select name="positionSelection" v-model="position">
                        <option v-bind:value="position.id_position"
                            v-for="(position, index) in $store.getters['positions/getPositions']" v-bind:key="index">{{
                        position.position_name }}</option>
                    </select>
                </label>
                <label>
                    Имя:
                    <input type="text" placeholder="Введите имя" v-model="firstName" />
                </label>
                <label>
                    Фамилия:
                    <input type="text" placeholder="Введите фамилию" v-model="secondName" />
                </label>
                <label>
                    Отчество:
                    <input type="text" placeholder="Введите отчество" v-model="thridName" />
                </label>
                <label>
                    Элктронная почта:
                    <input type="text" placeholder="Введите электронную почту" v-model="email" />
                </label>
                <button class="send" @click="send">Отправить</button>
            </div>
        </div>



    </div>
</template>

<script>
export default {
    name: 'registerPage',
    data() {
        return {
            firstName: null,
            secondName: null,
            thridName: null,
            position: null,
            department: null,
            email: null
        }
    },
    methods: {
        async send() {
            try {
                let payload = { first_name: this.firstName, second_name: this.secondName, middle_name: this.thridName, id_position: this.position, id_department: this.department, email: this.email };
                await this.$api.auth.register(payload);
                console.log(payload);
            } catch (e) {
                console.log(e);
            }

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registerPage {
    height: calc(100% - 53px);
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 300px;
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
</style>