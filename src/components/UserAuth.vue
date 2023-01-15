<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-mail</label>
        <div v-show="!formIsValid" class="error text-danger">{{ error }}</div>
        <v-text-field
          :error-messages="emailErrors"
          type="email"
          id="email"
          placeholder="example@gmail.com"
          v-model.trim="email"
          @input="v$.email.$touch()"
          @blur="v$.email.$touch()"
        />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <v-text-field
          :error-messages="passwordErrors"
          type="password"
          id="password"
          placeholder="1234"
          v-model.trim="password"
          @input="v$.password.$touch()"
          @blur="v$.password.$touch()"
        />
      </div>
      <div className="button-groups">
        <button class="btn btn-primary mt-2" :disabled="getLoadingState">
          <span
            v-if="getLoadingState"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {{ submitButtonCaption }}
        </button>
        <a href="#" class="mt-2" @click="switchAuthMode()">
          {{ switchModeButtonCaption }}
        </a>
      </div>
    </form>
  </base-card>
</template>

<script>
import { mapGetters } from "vuex";
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      password: "",
      mode: "login",
      error: null,
    };
  },
  computed: {
    ...mapGetters("loading", ["getLoadingState"]),
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Sign up";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Sign up instead";
      } else {
        return "Login instead";
      }
    },
    passwordErrors() {
      const errors = [];
      if (!this.v$.password.$dirty) return errors;
      this.v$.password.minLength.$invalid &&
        errors.push("Must be at least 6 characters long");
      this.v$.password.required.$invalid &&
        errors.push("Password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.v$.email.$dirty) return errors;
      this.v$.email.required.$invalid && errors.push("E-mail is required");
      this.v$.email.email.$invalid && errors.push("Must be valid e-mail");
      return errors;
    },
  },
  methods: {
    async submitForm() {
      this.v$.$touch();
      const authPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("auth/login", authPayload);
          this.userAuthenticatedSuccess = true;
        } else {
          await this.$store.dispatch("auth/signup", authPayload);
          this.userCreatedSuccess = true;
        }
      } catch (err) {
        this.error =
          err.message ||
          "failed to authenticate, Please try later. Check the login data";
      }
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else if (this.mode === "signup") {
        this.mode = "login";
      }
    },
    handleSuccess() {
      this.userCreatedSuccess = false;
      this.userAuthenticatedSuccess = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
  width: 100%;
  height: auto;
  border: none;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

.button-groups {
  padding: 0 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.button-groups button {
  width: 100%;
}

.button-group a {
  text-decoration: underline;
  cursor: pointer;
}

/* Spinner */
button span {
  margin-right: 4px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.error {
  margin-top: -8px;
}
</style>
