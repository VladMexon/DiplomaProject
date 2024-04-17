<template>
  <div class="new-notificiation center">
    <h3>Новое уведомление</h3>
    <button class="closeButton" @click="closeModal"><img src="../assets/close.png" width="30" height="30"
        alt="submit" /></button>
    <br />
    <label>
      Тип уведомления:
      <select name="notifTypes" v-model="selectedType">
        <option v-bind:value="type.id_type"
          v-for="(type, index) in $store.getters['notificationTypes/getnotificationTypes']" v-bind:key="index">{{
      type.type_name }}</option>
      </select>
    </label>
    <h4>Заголовок уведомления</h4>
    <textarea v-model="notificationHeader" placeholder="Введите текст заголовка уведомления"></textarea>
    <h4>Текст уведомления</h4>
    <textarea v-model="notificationText" placeholder="Введите текст уведомления"></textarea>
    <h4>Получатель</h4>
    <div class="recipients">
      <ul class="list">
        <li v-for="(department, indexD) in departmentData" v-bind:key="indexD">
          Отдел: {{ department.department.department_name }}
          <input type="checkbox" v-bind:value="indexD" v-bind:id="'d' + indexD" v-model="departmentsCheckboxes">
          <ul>
            <li v-for="(position, indexP) in department.positions" v-bind:key="indexP">
              Должность: {{ position.position.position_name }}
              <input type="checkbox" v-bind:value="indexD + '_' + indexP" v-bind:id="'d' + indexD + 'p' + indexP"
                v-model="positionsCheckboxes">
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
    <h4>Кнопочки</h4>
    <div class="buttonList">
      <button @click="addButton">Добавить кнопочку</button>
      <button @click="removeButton">Убавить кнопочку</button>
      <div v-for="index in numOfButtonst" v-bind:key="index" class="newButton">
        <input type="text" v-bind:id="'buttonName' + index" placeholder="Введите текст кнопочки" ref="buttonName" />
        <div>
          Настройка ответа
          <button @click="showSttings(index)">Показать/Скрыть</button>
          <div v-show="visibleSettingsIds.includes(index)" class="respSett">
            Заголовок уведомления
            <textarea placeholder="Введите текст заголовка уведомления" ref="headerResp"></textarea>
            Текст уведомления
            <textarea placeholder="Введите текст уведомления" ref="textResp"></textarea>
            Получатель
            <div class="recipients">
              <ul class="list">
                <li v-for="(department, indexD) in departmentData" v-bind:key="indexD">
                  Отдел: {{ department.department.department_name }}
                  <input type="checkbox" v-bind:value="'R' + index + '_' + indexD"
                    v-bind:id="'R' + index + 'd' + indexD" v-model="departmentsCheckboxes">
                  <ul>
                    <li v-for="(position, indexP) in department.positions" v-bind:key="indexP">
                      Должность: {{ position.position.position_name }}
                      <input type="checkbox" v-bind:value="'R' + index + '_' + indexD + '_' + indexP"
                        v-bind:id="'R' + index + 'd' + indexD + 'p' + indexP" v-model="positionsCheckboxes">
                      <ul>
                        <li v-for="(recipient, indexR) in position.recipients" v-bind:key="indexR">
                          Сотрудник: {{ recipient.second_name }} {{ recipient.first_name }} {{ recipient.middle_name }}
                          <input type="checkbox" v-bind:value="'R' + index + '_' + indexD + '_' + indexP + '_' + indexR"
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
      notificationText: null,
      notificationHeader: null,
      recipientsCheckboxes: [],
      departmentsCheckboxes: [],
      positionsCheckboxes: [],
      error: false,
      numOfButtonst: 0,
      visibleSettingsIds: []
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
        buttons.push({ buttonText: this.$refs.buttonName[i].value, notificationHeader: this.$refs.headerResp[i].value, notificationText: this.$refs.textResp[i].value, recipients: [] });
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
      console.log(buttons);
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
          recipients.filter(recipient => recipient.id_department == department.id_department).forEach(recipient => {
            let position = positions.find(position => position.id_position == recipient.id_position);
            if (!watchedPositions.includes(position)) {
              watchedPositions.push(position);
              let positionData = {
                position: position,
                recipients: recipients.filter(recipient => recipient.id_position == position.id_position)
              };
              departmentData.positions.push(positionData);
            }
          });
          data.push(departmentData);
        });
      }
      return data;
    }
  },
  watch: {
    recipientsCheckboxes(val) {
      console.log(val);
    },
    positionsCheckboxes(val) {
      console.log(val);
      //this.recipientsCheckboxes = [];
      val.forEach((value) => {
        if (value[0] != 'R') {
          let data = value.split("_");
          let len = this.departmentData[parseInt(data[0])].positions[parseInt(data[1])].recipients.length;
          for (let i = 0; i < len; i++) {
            let newCheckBox = `${data[0]}_${data[1]}_${i}`
            if (!this.recipientsCheckboxes.includes(newCheckBox)) {
              this.recipientsCheckboxes.push(newCheckBox);
            }
          }
        }
        else {
          console.log('implement me');
        }

      })
    },
    departmentsCheckboxes(val) {
      console.log(val);
      val.forEach((value) => {
        if (value[0] != 'R') {
          let data = value;
          let lenP = this.departmentData[parseInt(data)].positions.length;
          for (let i = 0; i < lenP; i++) {
            let newCheckBox = `${data}_${i}`
            if (!this.positionsCheckboxes.includes(newCheckBox)) {
              this.positionsCheckboxes.push(newCheckBox);
            }
            let lenR = this.departmentData[parseInt(data)].positions[parseInt(i)].recipients.length;
            for (let j = 0; j < lenR; j++) {
              let newCheckBox = `${data}_${i}_${j}`
              if (!this.recipientsCheckboxes.includes(newCheckBox)) {
                this.recipientsCheckboxes.push(newCheckBox);
              }
            }
          }
        }else{
          console.log('implement me');
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-notificiation {
  background-color: rgb(235, 235, 235);
  border-radius: 10px;
  padding: 30px;
  width: 500px;
  height: 570px;
  overflow: auto;
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
  width: 100%;
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
</style>