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

<script src="./HomePage.js"/>