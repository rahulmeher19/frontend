<template>
    <div class="container-fluid">
         <div class="card">
            <div class="card-body">
                <div class="row pb-3">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary float-right" @click="addNew">Add Role</button>
                    </div>
                </div>
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Role Name</th>
                                    <th scope="col">Role Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Last Updated On</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(role, index) in roles" :key="index">
                                    <td>{{ role.roleName }}</td>
                                    <td>{{ role.roleTitle }}</td>
                                    <td>{{ role.description }}</td>
                                    <td>{{ role.lastUpdatedOn }}</td>
                                    <td>{{ role.role }}</td>
                                    <td><span @click="editRole(index)">Edit</span><span @click="deleteRole(index)">Delete</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
         </div>

        <div class="modal fade" id="role-modal" tabindex="-1">
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
                        <label for="roleName" class="col-sm-2 col-form-label">Role Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" id="roleName" v-model="roleName">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="roleTitle" class="col-sm-2 col-form-label">Role Title</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" id="roleTitle" v-model="roleTitle">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="description" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" id="description" v-model="description">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="addNewRole" v-if="modalStatus == 'New Role'">Add</button>
                    <button type="button" class="btn btn-primary" @click="updateRole" v-else>Update</button>
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
           roles: [],
           roleName: '',
           roleTitle: '',
           description: '',
           lastUpdatedOn: '',
           role: '',
        //    roles: [],
           roleId: 0,
           modalStatus: 'New Role'
        }
    },
    created: function () {
        this.getRoles();
    },
    methods: {
        addNew: function() {
            this.modalStatus = 'New Role';
            this.toggleRoleModal('show');
        },
        toggleRoleModal: function (action) {
            window.$('#role-modal').modal(action);
        },
        addNewRole: function() {
            let data = {
                roleName: this.roleName,
                roleTitle: this.roleTitle,
                description: this.description,
            };

            this.$http.post('/roles', data).then(response => {
                console.log(response.data);
                this.resetInputFields();
                this.getRoles();
                this.toggleRoleModal('hide');
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
            this.roleName = this.roleTitle = this.description = this.lastUpdatedOn = this.role = '';
        },
        editRole: function (index) {
            this.modalStatus = 'Update Role';
            let role = this.roles[index];
            this.roleName = role.roleName;
            this.roleTitle = role.roleTitle;
            this.description  = role.description;
            this.role = role.role;
            this.roleId = role.id;
            this.toggleRoleModal('show');
        },
        updateRole: function () {
            let data = {
                roleName: this.roleName,
                roleTitle: this.roleTitle,
                description: this.description
            };

            this.$http.patch('/roles/' + this.roleId, data).then(response => {
                console.log(response.data);
                this.roleId = 0;
                this.resetInputFields();
                this.getRoles();
                this.toggleRoleModal('hide');
            }).catch(errors => {
                console.log(errors.response.data);
            });
        },
        deleteRole: function (index) {
            let role = this.roles[index];
            this.$http.delete('/roles/' + role.id).then(response => {
                console.log(response.data);
                this.getRoles();
            }).catch(errors => {
                console.log(errors.response.data);
            });
        }
    }
}
</script>