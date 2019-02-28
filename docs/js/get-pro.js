(() => {
  const infoController = new InfoController();

  /*-------------------------------------------------------------------------------
  Dialog
  -------------------------------------------------------------------------------*/
  const dialog = new A11yDialog(document.getElementById("auth-dialog"));

  /*-------------------------------------------------------------------------------
    Auth
  -------------------------------------------------------------------------------*/
  const authController = new Auth({ dialog });

  firebase.auth().onAuthStateChanged(user => {
    document.querySelector("#loading").style.display = "none";
    if (!user) {
      dialog.show();
      document.querySelector("#notloggedin").style.display = "block";
      document.querySelector("#loggedin").style.display = "none";
    } else {
      document.querySelector("#notloggedin").style.display = "none";
      document.querySelector("#loggedin").style.display = "block";

      setup(user);
    }
  });

  async function setup(user) {
    document.querySelector("#username").value = user.email;
    document.querySelector("#email").value = user.email;

    const prices = await infoController.prices;
    document.querySelector("#pricing").innerText = prices.professional;

    document
      .querySelector("#get-pro-form")
      .addEventListener("submit", event => {
        event.preventDefault();

        firebase
          .database()
          .ref(`users/${user.uid}/info`)
          .set({
            firstname: document.querySelector("#firstname").value,
            lastname: document.querySelector("#lastname").value,
            cc: {
              name: document.querySelector("#cc-name").value,
              num: document.querySelector("#cc-num").value,
              valid: document.querySelector("#cc-valid").value,
              ccv: document.querySelector("#cc-ccv".value)
            }
          });

        document.querySelector("#notloggedin").style.display = "none";
        document.querySelector("#loggedin").style.display = "none";
        document.querySelector("#success").style.display = "block";

        firebase
          .database()
          .ref(`users/${user.uid}/trial`)
          .set(false);

        return false;
      });

    document
      .querySelector("#logout")
      .addEventListener("click", () => authController.handleLogout());
  }
})();
