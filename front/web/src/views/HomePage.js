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