<template>
    <div>
        <form class="formLogin" @submit.prevent="createExpense">
            <h1>INCLUIR UMA NOVA CONTA</h1><br>
            <div >
                <input type="text"
                       class="type"
                       v-model="ds_expense_posted"
                       id="ds_expense_posted"
                       placeholder="DESCRIÇÃO*">


                <label for="dt_expense_posted">
                    <input type="text"
                           class="type"
                           v-model="dt_expense_posted"
                           id="dt_expense_posted"
                           placeholder="DATA DE VENCIMENTO*">

                </label>

                <label for="expense_posted_value">
                    <input type="text"
                           class="type"
                           v-model="expense_posted_value"
                           id="expense_posted_value"
                           placeholder="VALOR*">
                </label>


                <label class="selectCode">
                    <h3>CÓDIGO*</h3>
                    <select v-model="cd_payment_code">
                        <option v-bind:value="null">SELECIONE</option>
                        <option v-for="code in this.payment_code"
                                v-bind:key="code.cd_payment_code"
                                v-bind:value="code.cd_payment_code">
                            {{ code.ds_payment_code }}
                        </option>
                    </select>
                </label>

                <label class="selectCategory">
                    <h3>CATEGORIA*</h3>
                    <select v-model="cd_payment_category">
                        <option v-bind:value="null">SELECIONE</option>
                        <option v-for="category in this.payment_category"
                                v-bind:key="category.cd_payment_category"
                                v-bind:value="category.cd_payment_category">
                            {{ category.ds_payment_category }}
                        </option>
                    </select>
                </label>

                <label class="selectCategory">
                    <h3>FORMA DE PAGAMENTO*</h3>
                    <select v-model="cd_payment">
                        <option v-bind:value="null">SELECIONE</option>
                        <option v-for="payment in this.payment"
                                v-bind:key="payment.cd_payment"
                                v-bind:value="payment.cd_payment">
                            {{ payment.ds_payment }}
                        </option>
                    </select>
                </label>
            </div>
            <br>

            <button class="btn" type="submit">CADASTRAR</button>

            <button class="btn" @click="cancel()">CANCELAR</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Persist',
        data() {
            return {
                ds_expense_posted: '',
                dt_expense_posted: '',
                expense_posted_value: '',
                cd_payment_category: '',
                cd_payment_code: '',
                cd_payment: '',
                edit: false,
                payment_category: '',
                payment_code: '',
                payment: '',
            }
        },
        created() {

            this.getPaymentCategory();
            this.getPaymentCode();
            this.getPayment();
        },
        mounted() {
        },
        methods: {
            createExpense() {
                this.$http.post(process.env.VUE_APP_API + '/api/expense-posted', {
                    ds_expense_posted: this.ds_expense_posted,
                    dt_expense_posted: this.dt_expense_posted,
                    expense_posted_status: this.expense_posted_status,
                    expense_posted_value: this.expense_posted_value,
                    cd_payment_category: this.cd_payment_category,
                    cd_payment_code: this.cd_payment_code,
                    cd_payment: this.cd_payment,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }

                },).then(response => {
                    alert(response.data.message);
                    this.$router.push({name: 'home'});
                })
            },
            getPaymentCategory() {
                this.$http.get(process.env.VUE_APP_API + '/api/payment-category', {
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                }).then(response => {
                    this.payment_category = response.data
                }).catch(error => {
                    return alert(error.message)
                })
            },

            getPaymentCode() {
                this.$http.get(process.env.VUE_APP_API + '/api/payment-code', {
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                }).then(response => {
                    this.payment_code = response.data
                }).catch(error => {
                    return alert(error.message)
                })
            },

            getPayment() {
                this.$http.get(process.env.VUE_APP_API + '/api/payment', {
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                }).then(response => {
                    this.payment = response.data
                }).catch(error => {
                    return alert(error.message)
                })
            },
            cancel() {
                this.$router.push({name: 'home'})
            }
        }

    }
</script>

<style scoped>

</style>
