import { get, post, put, del } from "./requester.js";
import * as authHandler from "./handlers/auth-handler.js";
import * as shared from "./shared.js";

const app = Sammy("body", function() {
  this.use("Handlebars", "hbs");
  this.get("/", function(ctx) {
    shared.setHeaderInfo(ctx);
    const partials = shared.getPartials();
    if (ctx.isAuth) {
      get("appdata", "treks", "Kinvey").then(treks => {
        ctx.treks = treks;

        this.loadPartials(partials).partial("./views/home.hbs");
      });
    } else {
      partials["homeAnonymous"] = "./views/home-anonymous.hbs";
      this.loadPartials(partials).partial("./views/home.hbs");
    }
  });
  this.get("/register", authHandler.getRegister);
  this.post("/register", authHandler.postRegister);
  this.get("/login", authHandler.getLogin);
  this.post("/login", authHandler.postLogin);
  this.get("/logout", authHandler.logout);

  this.get("/create", function(ctx) {
    shared.setHeaderInfo(ctx);
    this.loadPartials(shared.getPartials()).partial(
      "./views/treks/treks-create.hbs"
    );
  });
  this.post("/create", function(ctx) {
    const { location, dateTime, description, imageURL } = ctx.params;

    if (
      location.length >= 6 &&
      dateTime &&
      description.length >= 10 &&
      imageURL
    ) {
      post("appdata", "treks", {
        location,
        dateTime,
        description,
        imageURL,
        organizer: sessionStorage.getItem("username"),
        likesCounter: 0
      })
        .then(() => {
          shared.displaySuccess("Trek created successfully!");
          ctx.redirect("/");
        })
        .catch(() => shared.displayError("Something went wrong!"));
    } else {
      shared.displayError("Invalid input.");
    }
  });
  this.get("trek/:id", function(ctx) {
    const id = ctx.params.id;

    shared.setHeaderInfo(ctx);

    get("appdata", `treks/${id}`, "Kinvey")
      .then(trek => {
        trek.isCreator = sessionStorage.getItem("userId") === trek._acl.creator;
        ctx.trek = trek;
        this.loadPartials(shared.getPartials()).partial(
          "../views/treks/treks-details.hbs"
        );
      })
      .catch(console.error);
  });

  this.get("edit/:id", function(ctx) {
    const id = ctx.params.id;
    shared.setHeaderInfo(ctx);

    get("appdata", `treks/${id}`, "Kinvey").then(trek => {
      shared.displaySuccess("Trek edited successfully.");
      ctx.trek = trek;

      this.loadPartials(shared.getPartials()).partial(
        "../views/treks/treks-edit.hbs"
      );
    });
  });

  this.post("edit/:id", function(ctx) {
    const id = ctx.params.id;
    const {
      location,
      dateTime,
      description,
      imageURL,
      organizer,
      likesCounter
    } = ctx.params;
    put("appdata", `treks/${id}`, {
      location,
      dateTime,
      description,
      imageURL,
      organizer,
      likesCounter
    })
      .then(() => {
        shared.displaySuccess("Success!");
        ctx.redirect("/");
      })
      .catch(() => shared.displayError("Something went wrong!"));
  });

  this.get("close/:id", function(ctx) {
    const id = ctx.params.id;
    shared.setHeaderInfo(ctx);

    del("appdata", `treks/${id}`, "Kinvey").then(trek => {
      shared.displaySuccess("You closed the trek successfully!");
      ctx.redirect("/");
    });
  });

  this.get("/profile", function(ctx) {
    shared.setHeaderInfo(ctx);
    const partials = shared.getPartials();

    this.loadPartials(partials).partial("./views/profile.hbs");
  });

  this.get("/like/:id", function(ctx) {
    const id = ctx.params.id;
    shared.setHeaderInfo(ctx);

    get("appdata", `treks/${id}`, "Kinvey")
      .then(trek => {
        trek.likesCounter++;
        shared.displaySuccess("You liked the trek successfully.");

        put("appdata", `treks/${id}`, trek, "Kinvey")
          .then(() => {
            ctx.redirect(`trek/${id}`);
          })
          .catch(console.error);
      })
      .catch(console.error);
  });
});

app.run();
