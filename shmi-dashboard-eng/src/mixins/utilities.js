const utilities = {
  methods: {
    /*
      Test: on build remove headers
    */
    fetchData(url) {
      //console.log(url);
      return new Promise((resolve, reject) => {
        this.$http
          .get(url /*, {
            headers: {
              BrowserEnterprise: 100,
              BrowserSite: "0000006400000065",
            },
          }*/)
          .then((response) => {
            // JSON responses are automatically parsed.
            //console.log(JSON.stringify(response.data));
            //this.enterprises = response.data.enterprises;
            resolve(response.data);
          })
          .catch((e) => {
            //console.log(JSON.stringify(e));
            reject(e);
          });
      });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
  },
};

export { utilities };
