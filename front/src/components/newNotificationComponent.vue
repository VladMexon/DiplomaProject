<template>
    <div class="new-notificiation center">
        <h3>Новое уведомление</h3>
        <label for="asdasd">
            Тип уведомления:
            <select name="notifTypes" v-model="selectedType">
                <option value="apple" v-for="(type, index) in this.notificationTypes" v-bind:key="index">{{ type.type_name }}</option>
            </select>
        </label>
        <h4>Текст уведомления</h4>
        <textarea v-model="notificationText" placeholder="Введите текст уведомления"></textarea>
        <h4>Получатель</h4>
        <div class="recipients">
          <ul>
            <li v-for="(department, index) in departmentData" v-bind:key="index">
              {{ department.department.department_name }}
              <input type="checkbox" v-bind:value="department.department.id_department" v-bind:id="'d' + department.department.id_department" v-model="departmentsCheckboxes">
              <ul>
                <li v-for="(position, index) in department.positions" v-bind:key="index">
                  {{ position.position.position_name }}
                  <input type="checkbox" v-bind:value=" department.department.id_department + '_' + position.position.id_position" v-bind:id="'d' + department.department.id_department +'p' + position.position.id_position" v-model="positionsCheckboxes">
                  <ul>
                    <li v-for="(recipient, index) in position.recipients" v-bind:key="index">
                      {{ recipient.second_name }} {{  recipient.first_name }} {{  recipient.middle_name  }}
                      <input type="checkbox"  v-bind:value="department.department.id_department +'_' + position.position.id_position + '_' + recipient.id_employee" v-bind:id="'d' + department.department.id_department +'p' + position.position.id_position + 'r' + recipient.id_employee" v-model="recipientsCheckboxes">
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
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
        recipientsCheckboxes: [], //сделать разными id чекбоксов
        departmentsCheckboxes: [],
        positionsCheckboxes: []
      }
    },
    methods: {
      
    },
    async created() {
      await this.$store.dispatch('positions/loadPositions');
      await this.$store.dispatch('recipients/loadRecipients');
      await this.$store.dispatch('departments/loadDepartments');
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
        
        
      },
      departmentsCheckboxes(val){
        console.log(val);
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
</style>
  