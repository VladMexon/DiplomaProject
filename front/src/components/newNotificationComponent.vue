<template>
    <div class="new-notificiation center">
        <h3>Новое уведомление</h3>
        <button class="closeButton" @click="closeModal"><img src="../assets/close.png" width="30" height="30" alt="submit"/></button>
        <br/>
        <label>
            Тип уведомления:
            <select name="notifTypes" v-model="selectedType">
                <option v-bind:value="type.id_type" v-for="(type, index) in this.notificationTypes" v-bind:key="index">{{ type.type_name }}</option>
            </select>
        </label>
        <h4>Заголовок уведомления</h4>
        <textarea v-model="notificationHeader" placeholder="Введите текст заголовка уведомления"></textarea>
        <h4>Текст уведомления</h4>
        <textarea v-model="notificationText" placeholder="Введите текст уведомления"></textarea>
        <h4>Получатель</h4>
        <div class="recipients">
          <ul>
            <li v-for="(department, indexD) in departmentData" v-bind:key="indexD">
              {{ department.department.department_name }}
              <input type="checkbox" v-bind:value="indexD" v-bind:id="'d' + indexD" v-model="departmentsCheckboxes">
              <ul>
                <li v-for="(position, indexP) in department.positions" v-bind:key="indexP">
                  {{ position.position.position_name }}
                  <input type="checkbox" v-bind:value=" indexD + '_' + indexP" v-bind:id="'d' + indexD +'p' + indexP" v-model="positionsCheckboxes">
                  <ul>
                    <li v-for="(recipient, indexR) in position.recipients" v-bind:key="indexR">
                      {{ recipient.second_name }} {{  recipient.first_name }} {{  recipient.middle_name  }}
                      <input type="checkbox"  v-bind:value="indexD +'_' + indexP + '_' + indexR" v-bind:id="'d' + indexD +'p' + indexP + 'r' + indexR" v-model="recipientsCheckboxes">
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <p v-if="error">Произошла ошибка при запросе</p>
        <button class="sendNotification" @click="sendNotification">Отправить</button>
    </div>
</template>
  
<script>
  export default {
    name: 'leftMenuComponent',
    data() {
      return {
        notificationTypes: null,
        departments: null,
        positions: null,
        recipients: null,
        selectedType: null,
        notificationText: null,
        notificationHeader: null,
        recipientsCheckboxes: [], 
        departmentsCheckboxes: [],
        positionsCheckboxes: [],
        error: false
      }
    },
    methods: {
      closeModal(){
        this.$emit('closeNotificationModal');
      },
      async sendNotification(){
        let recipients = [];
        this.recipientsCheckboxes.forEach(checkbox => {
          let ids = checkbox.split("_"); //department_position_employee
          recipients.push(this.departmentData[ids[0]].positions[ids[1]].recipients[ids[2]].id_employee);
        });
        try{
          await this.$api.notification.sendNotification({
          notificationHeader: this.notificationHeader,
          notificationText: this.notificationText,
          isDelayed: false, //for now
          sendDate: null,
          notificationType: this.selectedType,
          isDrafted: false,
          recipients
        });
        this.$emit('closeNotificationModal');
        } catch(e){
          console.log(e);
          this.error = true;
        }
        
        
        
        
      }
    },
    async created() {
      this.notificationTypes = this.$store.getters['notificationTypes/getnotificationTypes'];
      this.departments = this.$store.getters['departments/getDepartments'];
      this.positions = this.$store.getters['positions/getPositions'];
      this.recipients = this.$store.getters['recipients/getRecipients'];
     },
     computed: {
      departmentData(){ //kill it with fire!!!
        let data = [];
        let watchedPositions = []
        if(this.departments && this.positions && this.recipients){
          this.departments.forEach(department => {
          let departmentData = {
            department: department,
            positions: []
          };
          this.recipients.filter(recipient => recipient.id_department == department.id_department).forEach(recipient => {
            let position = this.positions.find(position => position.id_position == recipient.id_position);
            if(!watchedPositions.includes(position)){
              watchedPositions.push(position);
            let positionData = {
              position: position,
              recipients: this.recipients.filter(recipient => recipient.id_position == position.id_position)
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
      recipientsCheckboxes(val){
        console.log(val);
      },
      positionsCheckboxes(val){
        console.log(val);
        //this.recipientsCheckboxes = [];
        val.forEach((value) => {
          let data = value.split("_");
          let len = this.departmentData[parseInt(data[0])].positions[parseInt(data[1])].recipients.length;
          for(let i = 0; i < len; i++){
            let newCheckBox = `${data[0]}_${data[1]}_${i}`
            if(!this.recipientsCheckboxes.includes(newCheckBox)){
              this.recipientsCheckboxes.push(newCheckBox);
            }
          }
        })
      },
      departmentsCheckboxes(val){
          console.log(val);
          val.forEach((value) => {
          let data = value;
          let lenP = this.departmentData[parseInt(data)].positions.length;
          for(let i = 0; i < lenP; i++){
            let newCheckBox = `${data}_${i}`
            if(!this.positionsCheckboxes.includes(newCheckBox)){
              this.positionsCheckboxes.push(newCheckBox);
            }
            let lenR = this.departmentData[parseInt(data)].positions[parseInt(i)].recipients.length;
            for(let j = 0; j < lenR; j++){
              let newCheckBox = `${data}_${i}_${j}`
              if(!this.recipientsCheckboxes.includes(newCheckBox)){
                this.recipientsCheckboxes.push(newCheckBox);
            }
          }
          }
        })
      }
     },
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-notificiation{
    background-color: rgb(235, 235, 235);
    border-radius: 10px;
    padding: 30px;
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
h3{
  display: inline-block;
}
.closeButton{
  float: right;
  border: 0;
  background:none;
}
</style>
  