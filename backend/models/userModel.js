const { mongoose } = require("../config/dbConnection");
const pwEncrypt = require("../helpers/pwEncryption");

// User Schema:
const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,

    },
    last_name: {
      type: String,
      trim: true,
    
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // Make password field not selectable by default
      select: false,
    },
    provider: {
      type: String,
      trim: true,
      enum: ['email', 'firebase'],
      default: "email",
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, collection: "users" }
);



UserSchema.pre(["save", "updateOne"], function (next) {
  // if the password is modified, encrypt it!
  // Skip validation if provider is firebase
  // Skip hashing for Firebase users
  if (this.provider === 'firebase') {
    return next();
}
  // we need to start by getting the data that is being modified or saved.
  // The way we do this is to reference the document as THIS
  const data = this?._update || this;
  // if we are performing an update operation the data we're trying to store
  // is this._update.  If we're saving, it's just this.

  // email@domain.com
  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    : true;
  // IF we actually wanted to validate email, we would put false as the OR value!

  if (isEmailValidated) {
    // console.log('Email OK')

    if (data?.password) {
      const isPasswordValidated =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          data.password
        );
      // This regex expression is requiring:
      // At least one lowercase letter
      // At least one uppercase letter
      // At least one digit
      // At least one special character
      // At least 8 characters

      if (isPasswordValidated) {
        // console.log('Password OK')
        data.password = pwEncrypt(data.password);

        if (this?._update) {
          this._update = data;
          // this._update.password = data.password
        } else {
          // this = data // izin vermiyor.
          this.password = data.password;
        }

        //? ShortHand:
        // // save:
        // this.password = data.password = passwordEncrypt(data.password)
        // // update:
        // this._update = data
      } else {
        next(
          new Error(
            "Password is not validated. It is necessary to have at least one lowercase letter, one uppercase letter, one digit, one special character, and 8 characters"
          )
        );
      }
    }
    next();
  } else {
    next(new Error("Email is not validated."));
  }
});

module.exports = mongoose.model("User", UserSchema);


