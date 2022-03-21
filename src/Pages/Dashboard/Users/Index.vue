<template>
    <div class="container-fluid">
         <div class="card">
            <div class="card-body">
                <div class="row pb-3">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary float-right" @click="addNewMember">Add Member</button>
                    </div>
                </div>
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in users" :key="index">
                                    <td>{{ user.firstName }}</td>
                                    <td>{{ user.lastName }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.phoneNo }}</td>
                                    <td>{{ user.role }}</td>
                                    <td><span @click="editUser(index)">Edit</span><span @click="deleteUser(index)">Delete</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
         </div>

        <div class="modal fade" id="member-modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ modalStatus }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label for="firstName" class="col-sm-2 col-form-label">First Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" id="firstName" v-model="firstName">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="lastName" class="col-sm-2 col-form-label">Last Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" id="lastName" v-model="lastName">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" id="email" v-model="email">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="phoneNumber" class="col-sm-2 col-form-label">Phone Number</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" id="phoneNumber" v-model="phoneNo">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="firstName" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control-plaintext" id="password" v-model="password">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="role" class="col-sm-2 col-form-label">Role</label>
                         <select class="form-control" id="role" v-model="role">
                             <option :value="role.role" v-for="(role, index) in roles" :key="index">{{ role.roleName }}</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="addNewUser" v-if="modalStatus == 'New Member'">Add</button>
                    <button type="button" class="btn btn-primary" @click="updateUser" v-else>Update</button>
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
           users: [],
           firstName: '',
           lastName: '',
           email: '',
           password: '',
           phoneNo: '',
           role: '',
           roles: [],
           userId: 0,
           modalStatus: 'New Member'
        }
    },
    created: function () {
        this.getUsers();
        this.getRoles();
    },
    methods: {
        addNewMember: function() {
            this.modalStatus = 'New Member';
            this.toggleMemberModal('show');
        },
        toggleMemberModal: function (action) {
            window.$('#member-modal').modal(action);
        },
        addNewUser: function() {
            let data = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                phoneNo: this.phoneNo,
                role: this.role,
            };

            this.$http.post('/users', data).then(response => {
                console.log(response.data);
                this.resetInputFields();
                this.getUsers();
                this.toggleMemberModal('hide');
            }).catch(errors => {
                console.log(errors.response.data);
            });
        },
        getUsers: function () {
            this.$http.get('/users').then(response => {
                this.users = response.data.data.result.results;
            }).catch(errors => {
                console.log(errors.response.data);
            });
        },
        getRoles: function () {
            this.$http.get('/roles').then(response => {
                this.roles = response.data.data.result.results;
            }).catch(errors => {
                console.log(errors.response.data);
            });
        },
        resetInputFields: function () {
            this.firstName = this.lastName = this.email = this.password = this.phoneNo = this.role = '';
        },
        editUser: function (index) {
            this.modalStatus = 'Update Member';
            let user = this.users[index];
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.phoneNo = user.phoneNo;
            this.role = user.role;
            this.userId = user.id;
            this.toggleMemberModal('show');
        },
        updateUser: function () {
            let data = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNo: this.phoneNo,
                role: this.role,
            };

            if(this.password) {
                data.password = this.password;
            }

            this.$http.patch('/users/' + this.userId, data).then(response => {
                console.log(response.data);
                this.userId = 0;
                this.resetInputFields();
                this.getUsers();
                this.toggleMemberModal('hide');
            }).catch(errors => {
                console.log(errors.response.data);
            });
        },
        deleteUser: function (index) {
            let user = this.users[index];
            this.$http.delete('/users/' + user.id).then(response => {
                console.log(response.data);
                this.getUsers();
            }).catch(errors => {
                console.log(errors.response.data);
            });
        }
    }
}
</script>