<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <div class="card shadow">
            <img src="/img/logo-400.jpg" width="100%" alt="Serena Project Logo" class="d-lg-none" />
            <img
              src="/img/logo-1400.jpg"
              width="100%"
              alt="Serena Project Logo"
              class="d-md-down-none"
            />
          </div>
          <b-card-group>
            <b-card no-body class="shadow p-4">
              <b-card-body v-if="loading" class="mt-4 text-center">
                <b-spinner style="width: 5rem; height: 5rem;" type="grow" label="Connecting"></b-spinner>
                <h5>Logging in...</h5>
              </b-card-body>
              <b-card-body v-if="!loading">
                <b-form @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted"></p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      required
                      class="form-control"
                      type="text"
                      placeholder="Username"
                      autocomplete="username email"
                      v-model="username"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      required
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <p class="text-danger">{{login_error}}</p>
                    <b-col cols="6" class="text-right d-lg-none">
                      <b-button variant="link" class="px-0">Register Now!</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="shadow text-white bg-dark py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Login to the SERENA services</p>
                  <a class="btn-link mt-3" href="/user/register">Register Now!</a>
                  <p class="text-muted">If you are not registered yet</p>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    this.loading = false;
  },
  data() {
    return {
      username: '',
      password: '',
      userId: '',
      loading: false,
      login_error: ''
    }
  },
  methods: {
    login: function () {
      /*this.login_error = '';
      this.loading = true;
      let login_url = process.env.VUE_APP_JSON_PLACEHOLDER_URL + 'posts';
      //console.log(login_url + ' - ' + JSON.stringify(params));
      this.$http.post(login_url, { username: this.username, password: this.password })
        .then(response => {
          // JSON responses are automatically parsed.
          //this.posts = response.data
          //console.log(JSON.stringify(response.data));
          this.userId = response.data.id;
          this.loading = false;*/
          this.$router.push({ name: 'Home', params: { userId: this.userId } });
        /*})
        .catch(e => {
          this.loading = false;
          this.login_error = e;
        });*/
    },
    postLogin(params) {
      this.login_error = '';
      this.loading = true;
      let login_url = process.env.VUE_APP_JSON_PLACEHOLDER_URL + 'posts';
      //console.log(login_url + ' - ' + JSON.stringify(params));
      this.$http.post(login_url, params)
        .then(response => {
          // JSON responses are automatically parsed.
          //this.posts = response.data
          //console.log(JSON.stringify(response.data));
          this.userId = response.data.id;
          this.loading = false;
          this.$router.push({ name: 'Home', params: { userId: this.userId } });
        })
        .catch(e => {
          this.loading = false;
          this.login_error = e;
        });
    }
  }
}
</script>
