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
                                            <h1 class="h4 text-gray-900 mb-4">Reset Password?</h1>
                                        </div>
                                         <div class="form-group">
                                            <input type="password" class="form-control form-control-user" placeholder="Password" v-model="password">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user" placeholder="Confirm Password" v-model="confirmPassword">
                                        </div>
                                        <div class="alert alert-danger" role="alert" v-if="errorMessage">
                                            {{ errorMessage }}
                                        </div>
                                        <button type="button" class="btn btn-primary btn-user btn-block" @click="resetPassword">Reset Password</button>
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
    data: function() {
        return {
            password: '',
            confirmPassword: '',
            errorMessage: '',
            successMessage: '',
        }
    },
    created: function () {
        if(!this.$route.query.token) {
            this.$router.push('/login'); 
        }
    },
    methods: {
        resetPassword: function() {

            this.errorMessage = this.successMessage = '';

            if(!this.password) {
                this.errorMessage = 'Password is required.';
                return true;
            }

            if(!this.confirmPassword) {
                this.errorMessage = 'Password confirmation is required.';
                return true;
            }

            if(this.password != this.confirmPassword) {
                this.errorMessage = 'Password doesnot match with password confirmation.';
                return true;
            }

            const data = {
                password: this.password,
                token: this.$route.query.token,
            };

            this.$http.post('/auth/reset-password', data).then(() => {
                setTimeout(() => {
                    this.successMessage = 'Password change successfully!';
                }, 1500);

                this.$router.push('/login');  
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

    .btn-primary {
        background-color: #da218f;
        border-color:#da218f;
    }
    .container {
        padding-top: 25vh;
    }
</style>
