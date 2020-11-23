const utilities = {
  methods: {
    /*
      Test: on build remove headers
    */
    fetchData(url) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(
            url /*{
            headers: {
              BrowserEnterprise: 300,
              BrowserSite: "0000012C0000012D",
            },
          }*/
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((e) => {
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
    containsKey(obj, key) {
      return Object.keys(obj).includes(key);
    },
  },
};

export { utilities };
