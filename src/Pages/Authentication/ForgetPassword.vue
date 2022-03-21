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
                                            <h1 class="h4 text-gray-900 mb-4">Forget Password?</h1>
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user" placeholder="Email Address" v-model="email">
                                        </div>
                                        <div class="alert alert-danger" role="alert" v-if="errorMessage">
                                            {{ errorMessage }}
                                        </div>
                                        <div class="alert alert-success" role="alert" v-if="successMessage">
                                            {{ successMessage }}
                                        </div>
                                        <button type="button" class="btn btn-primary btn-user btn-block"  @click="sendPasswordResetLink"  to='/reset-password'>Send Password Reset Link</button>
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
            email: '',
            errorMessage: '',
            successMessage: '',
        }
    },
    methods: {
        sendPasswordResetLink: function() {
        this.errorMessage = '';
          if(!this.email) {
                this.errorMessage = 'Email is required';
                return true;
            }

            const data = {
                email: this.email,
            };

             this.$http.post('/auth/forgot-password', data).then(() => {
                this.successMessage = 'We have send an email to reset password';
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