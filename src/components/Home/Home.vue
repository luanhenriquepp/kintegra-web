<template>
    <div class="container">
        <h1>Contas a pagar e a receber</h1>

        <div class="search-wrapper">
            <label>
                Filtro:
                <input type="text" v-model="search" placeholder="PESQUISAR CONTA"/>
            </label>
        </div>
        <div class="content" v-for="expense in filteredList" v-bind:key="expense.cd_expense_posted">
            <h3>Descrição: {{expense.ds_expense_posted}}</h3>
            <p>Preço: {{`R$ ${expense.expense_posted_value}`}}</p>
            <div v-for="category in expense.payment_category" v-bind:key="category.cd_payment_category">
                <p>Categoria: {{category.ds_payment_category}}</p>
            </div>
            <p>Forma de pagamento: {{expense.payment.ds_payment}}</p>
            <p>
            <p>Status: {{`${expense.expense_posted_status === 1 ? 'Pago' : 'Pendente'}`}}</p>
            <br>
            <button @click="deleteExpense(expense.cd_expense_posted)" class="btn">DELETAR</button>

            <button @click="newExpense()" class="btn">NOVO</button>
        </div>

    </div>

</template>
<script>
    export default {

        data() {
            return {
                search: '',
                expenses: [],
                expense: {
                    cd_expense_posted: '',
                    ds_expense_posted: '',
                    dt_expense_posted: '',
                    expense_posted_status: '',
                    expense_posted_value: '',
                    cd_payment_category: '',
                    cd_user: '',
                    cd_payment_code: '',
                    cd_payment: '',
                    payment_category: [
                        {
                            cd_payment_category: '',
                            ds_payment_category: ''
                        }
                    ],
                    payment: {
                        cd_payment: '',
                        ds_payment: ''
                    },
                    payment_code: {
                        cd_payment_code: '',
                        ds_payment_code: ''
                    }
                },
                cd_expense_posted: '',
                pagination: {},
                edit: false
            }
        },

        created() {
            this.fetchExpense();
        },

        methods: {
            fetchExpense() {
                this.$http.get(process.env.VUE_APP_API + '/api/expense-posted', {
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                }).then(response => {
                    this.checkToken(response);
                    this.expenses = response.data.data
                }).catch(error => {
                    return alert(error.message)
                })
            },
            deleteExpense(id) {
                if (confirm('Tem certeza que deseja excluir?')) {
                    this.$http.delete(process.env.VUE_APP_API + `/api/expense-posted/${id}`, {
                        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                    }).then(response => {
                        alert(response.data.message);
                        this.fetchExpense();
                    })
                }
            },
            checkToken(token) {
                if (token.data.error === "TOKEN_EXPIRED") {
                    this.$router.push({name: 'login'});
                }
            },
            newExpense() {
                this.$router.push({name: 'persist'});
            }
        },
        computed: {
            filteredList() {
                return this.expenses.filter(expense => {
                    return expense.ds_expense_posted.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    }
</script>
