class NotAvailable {
  constructor(obj) {
    this.dialog = obj.dialog;
    this.auth = obj.auth;
    this.node = document.querySelector("#na-form");
    this.addEventListeners();
  }

  addEventListeners() {
    this.node.addEventListener("submit", ev => this.onSubmit(ev));
  }

  onSubmit(ev) {
    ev.preventDefault();

    const checked = [];
    this.node.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
      if (checkbox.checked) {
        const name = checkbox.name.replace("f-", "");
        firebase
          .database()
          .ref(`tools/${name}/interested/${this.auth.uid}`)
          .set(true);
        firebase
          .database()
          .ref(`users/${this.auth.uid}/interested/${name}`)
          .set(true);
        checked.push(name);
      }
    });

    this.node.style.display = "none";
    document.querySelector("#thank-you").style.display = "block";

    console.log(ev, checked);
  }
}
