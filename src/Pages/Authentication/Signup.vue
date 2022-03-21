<template>
    <div class="bg-gradient-primary nitorom-background-image">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="p-4">
                                        <div class="text-center">
                                            <img src="/images/logo.png" class="pb-4">
                                            <h1 class="h4 text-gray-900 mb-4">Sign Up!</h1>
                                        </div>
                                             <div class="form-group">
                                            <input type="firstName" class="form-control form-control-user" placeholder="First Name" v-model="firstName">
                                        </div>
                                            <div class="form-group">
                                            <input type="lastName" class="form-control form-control-user" placeholder="Last Name" v-model="lastName">
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user" placeholder="Email Address" v-model="email">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user" placeholder="Password" v-model="password">
                                        </div>
                                            <div class="form-group">
                                            <input type="phoneNo" class="form-control form-control-user" placeholder="Phone Number" v-model="phoneNo">
                                        </div>
                                        <div class="alert alert-danger" role="alert" v-if="errorMessage">
                                            {{ errorMessage }}
                                        </div>
                                        <button type="button" class="btn btn-primary btn-user btn-block" @click="signup">Sign Up</button>
                                        <div class="text-center pt-2">
                                            <router-link class="small" to='/login'>Already have an account?</router-link>
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNo: '',
            errorMessage: '',
        }
    },
    created: function() {
        if(localStorage.getItem('NiTOROM-TOKEN')) {
            this.$router.redirect('/login');
        }
    },
    methods: {
        signup: function () {
            if(!this.email && !this.password && !this.firstName && !this.lastName && !this.phoneNo) {
                this.errorMessage = 'Enter the credential carefully';
                return true;
            }

            const data = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                phoneNo: this.phoneNo,
            };

            this.$http.post('/auth/register', data).then(response => {
                localStorage.setItem('NiTOROM-TOKEN', response.data.data.tokens.refresh.token);
                this.$http.defaults.headers.authorization = `Bearer ${response.data.data.tokens.refresh.token}`;
                this.$router.redirect('/login');  
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