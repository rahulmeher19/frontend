<template>
    <div class="bg-gradient-primary nitorom-background-image">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <img src="/images/logo.png" class="pb-4">
                                            <h1 class="h4 text-gray-900 mb-4">Sign In!</h1>
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user" placeholder="Email Address" v-model="email">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user" placeholder="Password" v-model="password">
                                        </div>
                                        <div class="alert alert-danger" role="alert" v-if="errorMessage">
                                            {{ errorMessage }}
                                        </div>
                                        <button type="button" class="btn btn-primary btn-user btn-block" @click="login">Login</button>
                                        <div class="text-center pt-2">
                                            <router-link class="small" to='/forget-password'>Forgot Password?</router-link>
                                            <router-link class="small" to='/signup'>Sign Up</router-link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function (){
        return {
            email: 'admin@yopmail.com',
            password: 'Chetu@123',
            errorMessage: '',
        }
    },
    created: function() {
        if(localStorage.getItem('NiTOROM-TOKEN')) {
            this.$router.push('/dashboard');
        }
    },
    methods: {
        login: function () {
            if(!this.email && !this.password) {
                this.errorMessage = 'Email and password is required';
                return true;
            }

            const data = {
                email: this.email,
                password: this.password,
            };

            this.$http.post('/auth/login', data).then(response => {
                localStorage.setItem('NiTOROM-TOKEN', response.data.data.tokens.refresh.token);
                this.$http.defaults.headers.authorization = `Bearer ${response.data.data.tokens.refresh.token}`;
                this.$router.push('/dashboard');  
            }).catch(errors => {
                if(errors.response.data.message) {
                    this.errorMessage = errors.response.data.message;
                }
            });
        }
    }
}
</script>
<style scoped>
    .bg-gradient-primary {
        height: 100vh;
        background-image: linear-gradient(180deg,#000000 10%,#000000 100%);
    }

    .container {
        padding-top: 25vh;
    }

    .btn-primary {
        background-color: #da218f;
        border-color: #da218f;
    }
    .small {
        color: #da218f;
    }
</style>