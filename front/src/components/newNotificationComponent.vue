<template>
  <div class="new-notificiation center">
    <h3>Новое уведомление</h3>
    <button class="closeButton" @click="closeModal"><img src="../assets/close.png" width="30" height="30" /></button>
    <div class="form">
      <p class="error" v-if="buttonNameError">Названия кнопок не могут быть пустыми</p>
      <p class="error" v-if="headerError">Заголовок не может быть пустым</p>
      <p class="error" v-if="recipientsError">Должны быть выбраны получатели</p>
      <p class="error" v-if="selectedTypeError">У уведомления должен быть выбран тип</p>
      <div class="block">
        <label>
          Тип уведомления:
          <select name="notifTypes" v-model="selectedType">
            <option v-bind:value="type.id_type"
              v-for="(type, index) in $store.getters['notificationTypes/getnotificationTypes']" v-bind:key="index">{{
      type.type_name }}</option>
          </select>
        </label>
      </div>
      <div class="block">
        <h4>Заголовок уведомления</h4>
        <textarea v-model="notificationHeader" placeholder="Введите текст заголовка уведомления"></textarea>
      </div>
      <div class="block">
        <h4>Текст уведомления</h4>
        <textarea v-model="notificationText" placeholder="Введите текст уведомления"></textarea>
      </div>
      <div class="block">
        <h4>Получатель</h4>
        <div class="recipients">
          <ul class="list">
            <li v-for="(department, indexD) in departmentData" v-bind:key="indexD">
              Отдел: {{ department.department.department_name }}
              <button class="markAll" @click="markAll(`${indexD}`)">Выделить все</button>
              <ul>
                <li v-for="(position, indexP) in department.positions" v-bind:key="indexP">
                  Должность: {{ position.position.position_name }}
                  <button class="markAll" @click="markAll(`${indexD}_${indexP}`)">Выделить все</button>
                  <ul>
                    <li v-for="(recipient, indexR) in position.recipients" v-bind:key="indexR">
                      Сотрудник: {{ recipient.second_name }} {{ recipient.first_name }} {{ recipient.middle_name }}
                      <input type="checkbox" v-bind:value="indexD + '_' + indexP + '_' + indexR"
                        v-bind:id="'d' + indexD + 'p' + indexP + 'r' + indexR" v-model="recipientsCheckboxes">
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="block">
        <h4>Кнопочки</h4>
        <div class="buttonList">
          <button @click="addButton">Добавить кнопочку</button>
          <button @click="removeButton">Убавить кнопочку</button>
          <div v-for="index in numOfButtonst" v-bind:key="index" class="newButton">
            <input type="text" placeholder="Введите текст кнопочки" ref="buttonName" />
            <div>
              Настройка ответа
              <button @click="showSttings(index)">Показать/Скрыть</button>
              <div v-show="visibleSettingsIds.includes(index)" class="respSett">
                <label>
                  Тип уведомления:
                  <select name="notifTypes" ref="notifType">
                    <option v-bind:value="type.id_type"
                      v-for="(type, index) in $store.getters['notificationTypes/getnotificationTypes']"
                      v-bind:key="index">
                      {{ type.type_name }}</option>
                  </select>
                </label>
                <br>
                Заголовок уведомления
                <textarea placeholder="Введите текст заголовка уведомления" ref="headerResp"></textarea>
                Текст уведомления
                <textarea placeholder="Введите текст уведомления" ref="textResp"></textarea>
                Получатель
                <div class="recipients">
                  <ul class="list">
                    <li v-for="(department, indexD) in departmentData" v-bind:key="indexD">
                      Отдел: {{ department.department.department_name }}
                      <button class="markAll" @click="markAll(`R${index}_${indexD}`)">Выделить все</button>
                      <ul>
                        <li v-for="(position, indexP) in department.positions" v-bind:key="indexP">
                          Должность: {{ position.position.position_name }}
                          <button class="markAll" @click="markAll(`R${index}_${indexD}_${indexP}`)">Выделить
                            все</button>
                          <ul>
                            <li v-for="(recipient, indexR) in position.recipients" v-bind:key="indexR">
                              Сотрудник: {{ recipient.second_name }} {{ recipient.first_name }} {{ recipient.middle_name
                              }}
                              <input type="checkbox"
                                v-bind:value="'R' + index + '_' + indexD + '_' + indexP + '_' + indexR"
                                v-bind:id="'R' + index + 'd' + indexD + 'p' + indexP + 'r' + indexR"
                                v-model="recipientsCheckboxes">
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <p v-if="error">Произошла ошибка при запросе</p>
    <button class="sendNotification" @click="sendNotification">Отправить</button>
  </div>
</template>

<script>
export default {
  name: 'newNotificationComponent',
  data() {
    return {
      selectedType: null,
      notificationText: "",
      notificationHeader: "",
      recipientsCheckboxes: [],
      departmentsCheckboxes: [],
      positionsCheckboxes: [],
      error: false,
      numOfButtonst: 0,
      visibleSettingsIds: [],
      selectedTypeError: false,
      headerError: false,
      recipientsError: false,
      buttonNameError: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeNotificationModal');
    },
    async sendNotification() {
      let recipients = [];
      let buttons = [];
      for (let i = 0; i < this.numOfButtonst; i++) {
        buttons.push({ buttonText: this.$refs.buttonName[i].value, notificationHeader: this.$refs.headerResp[i].value, notificationText: this.$refs.textResp[i].value, recipients: [], notificationType: this.$refs.notifType[i].value });
      }
      this.recipientsCheckboxes.forEach(checkbox => {
        if (checkbox[0] != 'R') {
          let ids = checkbox.split("_"); //department_position_employee
          recipients.push(this.departmentData[ids[0]].positions[ids[1]].recipients[ids[2]].id_employee);
        } else {
          let ids = checkbox.slice(1).split("_");
          console.log(ids);
          buttons[ids[0] - 1].recipients.push(this.departmentData[ids[1]].positions[ids[2]].recipients[ids[3]].id_employee);
        }
      });
      this.selectedTypeError = false;
      this.headerError = false;
      this.recipientsError = false;
      this.buttonNameError = false;
      if (recipients.length == 0)
        this.recipientsError = true;
      if (this.notificationHeader == "")
        this.headerError = true;
      if (this.selectedType == null)
        this.selectedTypeError = true;
      buttons.forEach(button => {
        if (button.recipients.length == 0)
          this.recipientsError = true;
        if (button.buttonText == "")
          this.buttonNameError = true;
        if (button.notificationType == null)
          this.selectedTypeError = true;
        if (button.notificationHeader == "")
          this.headerError = true;
      });
      if (!this.recipientsError && !this.headerError && !this.selectedTypeError && !this.buttonNameError) {
        try {
          await this.$api.notification.sendNotification({
            notificationHeader: this.notificationHeader,
            notificationText: this.notificationText,
            isDelayed: false, //for now
            sendDate: null,
            notificationType: this.selectedType,
            isDrafted: false,
            recipients,
            buttons
          });
          this.$emit('closeNotificationModal');
        } catch (e) {
          console.log(e);
          this.error = true;
        }
      } else {
        console.log('error');
      }
    },
    addButton() {
      this.numOfButtonst++;
    },
    removeButton() {
      if (this.numOfButtonst > 0) {
        this.numOfButtonst--;
      }
    },
    showSttings(id) {
      if (this.visibleSettingsIds.includes(id)) {
        this.visibleSettingsIds = this.visibleSettingsIds.filter((item) =>
          item != id
        )
      } else {
        this.visibleSettingsIds.push(id);
      }
    },
    markAll(value) {
      let ids;
      if (value[0] != 'R') {
        ids = value.split('_');
      } else {
        ids = value.slice(1).split('_');
      }
      if (value[0] != 'R') {
        if (ids.length != 1) {
          let len = this.departmentData[parseInt(ids[0])].positions[parseInt(ids[1])].recipients.length;
          for (let i = 0; i < len; i++) {
            let newCheckBox = `${ids[0]}_${ids[1]}_${i}`
            if (!this.recipientsCheckboxes.includes(newCheckBox)) {
              this.recipientsCheckboxes.push(newCheckBox);
            }
          }
        } else {
          let lenP = this.departmentData[parseInt(ids)].positions.length;
          for (let i = 0; i < lenP; i++) {
            let lenR = this.departmentData[parseInt(ids)].positions[parseInt(i)].recipients.length;
            for (let j = 0; j < lenR; j++) {
              let newCheckBox = `${ids}_${i}_${j}`
              if (!this.recipientsCheckboxes.includes(newCheckBox)) {
                this.recipientsCheckboxes.push(newCheckBox);
              }
            }
          }
        }
      } else {
        if (ids.length == 3) {
          let len = this.departmentData[parseInt(ids[1])].positions[parseInt(ids[2])].recipients.length;
          for (let i = 0; i < len; i++) {
            let newCheckBox = `R${ids[0]}_${ids[1]}_${ids[2]}_${i}`
            if (!this.recipientsCheckboxes.includes(newCheckBox)) {
              this.recipientsCheckboxes.push(newCheckBox);
            }
          }
        } else {
          let lenP = this.departmentData[parseInt(ids[1])].positions.length;
          for (let i = 0; i < lenP; i++) {
            let lenR = this.departmentData[parseInt(ids[1])].positions[parseInt(i)].recipients.length;
            for (let j = 0; j < lenR; j++) {
              let newCheckBox = `R${ids[0]}_${ids[1]}_${i}_${j}`
              if (!this.recipientsCheckboxes.includes(newCheckBox)) {
                this.recipientsCheckboxes.push(newCheckBox);
              }
            }
          }
        }
      }
    }
  },
  computed: {
    departmentData() { //kill it with fire!!!
      let data = [];
      let watchedPositions = []
      let departments = this.$store.getters['departments/getDepartments'];
      let positions = this.$store.getters['positions/getPositions'];
      let recipients = this.$store.getters['employees/getEmployees'];
      if (departments && positions && recipients) {
        departments.forEach(department => {
          let departmentData = {
            department: department,
            positions: []
          };
          let depRec = recipients.filter(recipient => recipient.id_department == department.id_department);
          depRec.forEach(recipient => {
            let position = positions.find(position => position.id_position == recipient.id_position);
            if (!watchedPositions.includes(position)) {
              watchedPositions.push(position);
              let positionData = {
                position: position,
                recipients: depRec.filter(recipient => recipient.id_position == position.id_position)
              };
              departmentData.positions.push(positionData);
            }
          });
          data.push(departmentData);
          watchedPositions = [];
        });
      }
      console.log(data);
      return data;
    }
  },
  watch: {
    recipientsCheckboxes(val) {
      console.log(val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-notificiation {
  background-color: rgb(235, 235, 235);
  border-radius: 10px;
  padding: 30px;
  width: 70%;
  height: auto;
}

.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

ul {
  list-style-type: none;
}

h3 {
  display: inline-block;
  margin-top: 0px;
}

h4 {
  margin: 5px;
}

.list {
  margin: 0px;
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

.recipients {
  background-color: #dddddd;
  padding: 10px;
  overflow: auto;
  height: 150px;
}

.recipients .list {
  padding: 0px;
}

textarea {
  width: 98%;
  height: 70px;
  resize: none;
  overflow: auto;
}

.buttonList {
  background-color: rgb(221, 221, 221);
  border-radius: 10px;
  padding: 7px;
}

.respSett {
  background-color: rgb(194, 193, 193);
  border-radius: 10px;
  padding: 7px;
}

.newButton {
  background-color: rgb(206, 206, 206);
  border-radius: 10px;
  padding: 7px;
  margin: 3px;
}

.block {
  background-color: rgb(221, 221, 221);
  border-radius: 10px;
  padding: 5px;
  margin: 3px;
}

.form {
  height: 500px;
  overflow: auto;
}

.sendNotification {
  width: 100%;
  height: 30px;
}

.error{
  font-size: 12px;
  color: red;
  margin: 0px;
  margin-top: 5px;
}
</style>