(() => {
  const infoController = new InfoController();

  /*-------------------------------------------------------------------------------
  Dialog
  -------------------------------------------------------------------------------*/
  const dialog = new A11yDialog(document.getElementById("auth-dialog"));

  /*-------------------------------------------------------------------------------
    Download URLS
  -------------------------------------------------------------------------------*/
  fetch("https://api.github.com/repos/Rockstagram/app/releases/latest")
    .then(ok => ok.json())
    .then(latest => {
      const platforms = [
        { id: "mac", ext: ".dmg" },
        { id: "win", ext: ".exe" },
        { id: "lin", ext: ".AppImage" }
      ];
      for (let i = 0, il = latest.assets.length; i < il; i++) {
        console.log(il);
        const asset = latest.assets[i];
        for (let j = 0, jl = platforms.length; j < jl; j++) {
          const p = platforms[j];
          console.log(asset.name, p.ext);
          if (asset.name.endsWith(p.ext)) {
            const node = document.querySelector(`#download-${p.id}`);
            node.href = asset.browser_download_url;
            node.title = asset.name;
            platforms.splice(j, 1);
            break;
          }
        }
      }
    });

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
    document.querySelector("#email").value = user.email;

    authController.on("user:change", user => {
      console.log("user:change handler");
      const upgradeButton = document.querySelector("#upgrade");

      if (user.trial) {
        document.querySelector("#plan").value = "Free trial";
        upgradeButton.style.display = "block";
        upgradeButton.addEventListener(
          "click",
          () => (location.href = `/get-pro.html`)
        );
      } else {
        document.querySelector("#plan").value = "Professional";
        upgradeButton.style.display = "none";
      }
    });

    document
      .querySelector("#reset")
      .addEventListener("click", e => authController.reset(user.email));

    document
      .querySelector("#logout")
      .addEventListener("click", () => authController.handleLogout());
  }
})();
