<template>
    <v-container fluid class="pa-0 grey lighten-2">
        <!-- Una fila con dos columnas: formulario y tabla -->
        <v-row no-gutters dense class="mt-5" justify="center">

            <!-- Formulario -->
            <v-col align="center" justify="center" cols="2" md="5" xl="4">
                <v-card max-width="90%" min-height="100%" class="mb-5" elevation="10">
                  <v-card-text>

                      <v-form ref="form" v-model="valid">

                          <v-text-field v-model="firstName"
                          :rules="inputRules" label="First Name" required/>

                        <v-text-field v-model="lastName"
                            :rules="inputRules" label="Last Name" required/>

                        <v-text-field v-model="addr"
                            :rules="inputRules" label="Address" required/>

                        <v-text-field v-model="ssn"
                            :counter="11" :rules="ssnRules" label="SSN" required/>
                      </v-form>
                  </v-card-text>

                  <v-card-actions class="mt-10">
                    <v-spacer/>
                    <v-btn color="error" class="mr-4" @click="reset">
                      Reset
                    </v-btn>
                    <v-spacer/>
                    <v-btn color="success" class="mr-4" @click="save" :disabled="!valid">
                      Save
                    </v-btn>
                    <v-spacer/>
                  </v-card-actions>
                </v-card>
            </v-col>

          <!-- Tabla -->
          <v-col align="center" justify="center" cols="2" md="5" xl="4">
              <v-card max-width="90%" min-height="100%" elevation="10">
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="customers"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1"
                ></v-data-table>
              </v-card>
            </v-col>

        </v-row>

        <!-- Snackbar error -->
        <v-snackbar v-model="snackbarError" :timeout="timeout" color="error">
          {{ snackMsg }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbarError = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>

      <!-- Snackbar añadido-->
      <v-snackbar v-model="snackbarAdd" :timeout="timeout" color="success">
        {{ snackMsg }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbarAdd = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
</template>

<script>

var URL= "http://localhost:8081/api/members";

export default {
    components:{ },
    data(){
        return{
            valid: false,
            search: '',
            firstName: '',
            lastName: '',
            addr: '',
            ssn: '',
            response: '',
            snackbarError: false,
            snackbarAdd: false,
            snackMsg: '',
            timeout: 5000,
            headers: [
              {
                text: 'First name',
                align: 'start',
                sortable: false,
                value: 'name',
              },
              { text: 'Last name', value: 'lastName' },
              { text: 'Address', value: 'address' },
              { text: 'SSN', value: 'ssn' },
            ],
            customers: [
            ],
          inputRules: [
            v => !!v || 'Field required',
            v => (v && v.length > 1) || 'Field must be greater than 1 character',
            v => (!v.endsWith(' ') || 'Please remove space at the end')
          ],
          ssnRules: [
            v => !!v || 'Field required',
            v => (v && v.length == 11) || 'SSN must be 11 characters',
            v => (!v.endsWith(' ') || 'Please remove space at the end'),
            v => (/^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/.test(v) || 'SSN format must be ###-##-####'),
          ],
        }
    },
    methods:{

        reset () {
          this.$refs.form.reset();
          this.valid= false;
        },

        async getData(){
          let response= await this.axios.get(URL)
          if (response.data != null) {
            this.customers= [];
            for (var i = 0; i < response.data.length; i++) {
              let auxFirstName= response.data[i].firstName;
              let auxLastName= response.data[i].lastName;
              let auxAddress= response.data[i].address;
              let auxSSN= response.data[i].ssn;
              this.customers.push({'name': auxFirstName, 'lastName': auxLastName, 'address': auxAddress, 'ssn': auxSSN})
            }
          }
        },

        async save(){
          try {
            let response = await this.axios.post(URL, {
              firstName: this.firstName,
              lastName: this.lastName, address: this.addr, ssn: this.ssn
            }, {headers: {"access-control-allow-origin": "*",
                "access-control-allow-headers": "Authorization"}}) //TODO: cambiar por JSON.stringify
            if (response.data != null) {
              console.log("Añadido con éxito");
              this.snackMsg = "Successfully saved";
              this.snackbarAdd = true;
            }
            this.getData();
            this.reset();
          } catch (e) {
            console.log("Error al añadir");
            if (!e.response){
              this.snackMsg = "Connection failed";
              this.snackbarError = true;
            } else {
              this.snackMsg = "SSN must be unique"; //TODO: cómo levantar el mensaje del error
              this.snackbarError = true;
            }
          }
        }
    },
    mounted() {
      this.getData();
      this.valid= false;
    }
  }
</script>
