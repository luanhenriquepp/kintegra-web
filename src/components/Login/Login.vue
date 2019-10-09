<template>
    <div class="container">
        <form class="formLogin" @submit.prevent="login">
            <h1>Login</h1>
            <label class="labelEmail">
                <input required v-model="email" type="email" placeholder="E-MAIL *" class="inputEmail"/>
            </label>
            <label class="labelPassword">
                <input required v-model="password" type="password" placeholder="PASSWORD *"/>
            </label>
            <button class="btn" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        mounted() {
        },
        methods: {
            login() {
                this.$http.post(process.env.VUE_APP_API + '/api/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    if (response.data.token) {
                        localStorage.setItem('token', response.data.token);
                        this.$router.push({name: 'home'});
                    }
                }).catch(error => {
                    return alert(error.message)
                })
            },
        }
    }
</script>

<style scoped>



</style>
