class Auth {
  constructor(obj) {
    this.dialog = obj.dialog;
    this.node = document.querySelector("tjb-auth");
    this.addEventListeners();
  }

  addEventListeners() {
    this.node.addEventListener("success", event => this.handleSuccess(event));
    this.node.addEventListener("register", event => this.handleRegister(event));
    this.node.addEventListener("login", event => this.handleLogin(event));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("USER SIGNED IN");
        this.uid = user.uid;
        this._authUser = user;
        // if (!user.emailVerified)
        //   user
        //     .sendEmailVerification()
        //     .then(() => console.log("verification send"))
        //     .catch(error => console.log("Error: ", error));
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .on("value", snapshot => (this.user = snapshot.val()));
        firebase
          .database()
          .ref(`users/${user.uid}/intent`)
          .set(this.intent);
        firebase
          .database()
          .ref(`intent/${this.intent}/${user.uid}`)
          .set(true);
      } else {
        console.log("NO USER");
      }
    });

    return this;
  }

  on(listener, callback) {
    if (!this[listener]) this[listener] = [];
    this[listener].push(callback);
  }

  emit(listener, data) {
    if (this[listener]) this[listener].forEach(cb => cb(this._user));
  }

  set user(value) {
    console.log("saved user", value);
    this._user = value;
    this.emit("user:change", this._user);
  }

  get user() {
    return this._user;
  }

  get isLoggedIn() {
    return this.user;
  }

  handleRegister(body) {
    const { email, password } = body.detail;
    console.log("REGISTER", email, password, body);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(ok => this.handleSuccess({ area: "register", ok }))
      .catch(error =>
        this.handleError({
          area: "register",
          error: `[${error.code}] ${error.message}`
        })
      );
  }

  handleLogin(body) {
    const { email, password } = body.detail;
    console.log("LOGIN", email, password, body);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(ok => this.handleSuccess({ area: "login", ok }))
      .catch(error =>
        this.handleError({
          area: "login",
          error: `[${error.code}] ${error.message}`
        })
      );
  }

  handleLogout() {
    return firebase.auth().signOut();
  }

  reset(email) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(ok => {
        alert(
          `an email was send to ${email} containing password reset information`
        );
        e.target.disabled = true;
        return ok;
      })
      .catch(error => console.log(error));
  }

  handleSuccess(event) {
    console.log("worked…", event.ok);
    if (this._authUser && !this._authUser.emailVerified)
      this._authUser.sendEmailVerification();
    return this.node.success(event.area, event.ok).then(() => {
      this.dialog.hide();
      if (this.next) this.next();
      if (this[`${event.area}Success`]) return this[`${event.area}Success`]();
    });
  }

  handleError(event) {
    console.log("error…", event.error);
    return this.node.error(event.area, event.error);
  }

  registerSuccess() {
    this.node.showlogin = true;
  }
}
