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
        <div class="pass-requirement" v-if="!passwordValidation.valid"> 
          A senha deve conter:
          <span
            :key="error" 
            v-for='error in passwordValidation.errors'> 
            {{ error }}
          </span>
        </div>
        <div class="btn-box">
          <button>Salvar</button>
        </div>
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
      if (this.password !== "" && this.checkPassword !== "") {
        return (this.password !== this.checkPassword)
      } else {
        return false
      }
    },
    passwordValidation () {
      let errors = []
      for (let condition of this.rules) { 
        if (!condition.regex.test(this.password)) {  
          errors.push(condition.message)
        }
      }
      return (errors.length === 0) ? { valid: true, errors} : { valid: false, errors }
    }
  },
  methods: {
    /*TODO: validar uma funcao para limpar os input depois */
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

.pass-requirement {
  margin-top: 10px;
}

.btn-box {
  margin-top: 20px;
}

.matches {
  color: red;
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
  align-items: center;
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

.overlay-container {
	position: absolute;
	left: 50%;
	width: 50%;
	height: 100%;
}

.overlay {
	background: #ff7b00;
	background-repeat: no-repeat;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
}

</style>
