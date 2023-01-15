<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="example@gmail.com"
          v-model.trim="email"
        />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="1234"
          v-model.trim="password"
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

export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: "",
      mode: "login",
      error: null,
    };
  },
  computed: {
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
    ...mapGetters("loading", ["getLoadingState"]),
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      this.userCreatedSuccess = false;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

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
</style>
