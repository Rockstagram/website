(() => {
  const infoController = new InfoController();

  /*-------------------------------------------------------------------------------
  Dialog
  -------------------------------------------------------------------------------*/
  const dialog = new A11yDialog(document.getElementById("auth-dialog"));
  const notAvailableDialog = new A11yDialog(
    document.getElementById("not-awailable-dialog")
  );

  /*-------------------------------------------------------------------------------
    Auth
  -------------------------------------------------------------------------------*/
  const authController = new Auth({ dialog });
  const notAvailable = new NotAvailable({
    dialog: notAvailableDialog,
    auth: authController
  });

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
    document.querySelector("#email").value = user.email;
    const planNode = document.querySelector("#plan");

    authController.on("user:change", user => {
      console.log("user:change handler");
      const plan = user.plan;

      if (plan === "plan-s") {
        planNode.value = "Free";
        document.querySelector("#c-follower").checked = true;
      }
      if (plan === "plan-m") {
        planNode.value = "Professional";
        document.querySelector("#c-follower").checked = true;
        document.querySelector("#c-cleaner").checked = true;
      }
      if (plan === "plan-l") {
        planNode.value = "Ultimate";
        document.querySelector("#c-follower").checked = true;
        document.querySelector("#c-cleaner").checked = true;
        document.querySelector("#c-commenter").checked = true;
        document.querySelector("#c-messenger").checked = true;
      }

      infoController.prices.then(prices => {
        document.querySelector("#costs").value = prices[plan];
      });
    });

    document
      .querySelector("#reset")
      .addEventListener("click", e => authController.reset(user.email));

    document
      .querySelector("#logout")
      .addEventListener("click", () => authController.handleLogout());
  }
})();
