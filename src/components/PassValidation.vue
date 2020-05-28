<template>
    <div
        id="container"
        class="container"
    >
        <div class="form-container sign-in-container">
            <form action="#">
                <h2>Cadastro de senha</h2>
                <input
                    v-model="password"
                    :class="{ valid:passwordValidation.valid }"
                    type="password"
                    placeholder="Senha"
                >
                <input
                    v-model.lazy='checkPassword'
                    type="password"
                    placeholder="Confirme a senha"
                />
                <div class="matches" v-if='notSamePasswords'>
                    <p>Senhas não conferem.</p>
                </div>
                <div class="pass-requirement"> 
                    A senha deve conter:
                    <span
                        :key="error" 
                        v-for='error in passwordValidation.errors'> 
                        {{ error }}
                    </span>
                </div>

                <button>Salvar</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay" /> 
        </div>
    </div>
</template>

<script>
export default {
    name: "PassValidation",
    props: {
        msg: String
    },
    data () {
        return {
            rules: [
                { message: "Pelo menos 1 letra maiúscula",  regex:/[A-Z]+/ },
                { message: "Pelo menos 8 caracteres", regex:/.{8,}/ },
                { message: "Pelo menos 1 número", regex:/[0-9]+/ }
            ],
            password: "",
            checkPassword: "",
            passwordVisible: false,
            submitted: false
        }
    },
    computed: {
        notSamePasswords () {
            console.log("nothesame")
            console.log(this.passwordsFilled)
            if (this.passwordsFilled) {
                return (this.password !== this.checkPassword)
            } else {
                return false
            }
        },
        passwordsFilled () {
            return (this.password !== "" && this.checkPassword !== "")
        },
        passwordValidation () {
            console.log("pass validation")
            let errors = []
            for (let condition of this.rules) {
                console.log(condition)
                if (!condition.regex.test(this.password)) {
                    console.log(this.password)
                    errors.push(condition.message)
                }
            }
            if (errors.length === 0) {
                return { valid:true, errors }
            } else {
                return { valid:false, errors }
            }
        }
    },
    methods: {
        resetPasswords () {
            this.password = ""
            this.checkPassword = ""
            this.submitted = true
            setTimeout(() => {
                this.submitted = false
            }, 2000)
        },
        togglePasswordVisibility () {
            this.passwordVisible = !this.passwordVisible
        }	
    }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
	box-sizing: border-box;
}

body {
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;

}

span {
	font-size: 12px;
    display: block;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;

}

button {
	border-radius: 20px;
	border: 1px solid #ff7b00;
	background-color: #ff7b00;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
    border-radius: 2px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

.pass-requirement {
  margin-top: 10px;
  margin-bottom : 20px;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: 1px solid rgba(0, 0, 0, 0.23);
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
	0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
    align: center;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}


.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #ff7b00;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
   transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}



</style>
