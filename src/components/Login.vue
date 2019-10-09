<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Login</h1>
            <label>Email</label>
            <label>
                <input required v-model="email" type="email" placeholder="E-MAIL *"/>
            </label>
            <label>Password</label>
            <label>
                <input required v-model="password" type="password" placeholder="PASSWORD *"/>
            </label>
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                email: "",
                password: ""
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
                   return localStorage.setItem('token', response.data.token)
                }).catch(error => {
                    return alert(error.message)
                })
            }
        }
    }
</script>

<style scoped>

</style>
