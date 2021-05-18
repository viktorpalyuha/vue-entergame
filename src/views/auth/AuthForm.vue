<template>
  <form class="form" @submit.prevent="submitForm">
    <h1>{{ formHeader }}</h1>
    <div class="form-control-container" v-if="registration">
      <div class="form-control">
        <input
          type="text"
          id="fullname"
          class="form-input"
          autocomplete="off"
          placeholder=" "
          @blur="validateInput('fullName')"
          v-model="formData.fullName.value"
        />
        <label for="fullname"> Full Name </label>
      </div>
      <span
        class="invalid-data"
        v-if="!formData.fullName.valid && formData.fullName.touched"
      >
        Please, enter a valid Full Name!
      </span>
    </div>
    <div class="form-control-container">
      <div class="form-control">
        <input
          type="email"
          id="email"
          class="form-input"
          autocomplete="off"
          placeholder=" "
          @blur="validateInput('email')"
          v-model="formData.email.value"
        />
        <label for="email"> Email </label>
      </div>
      <span
        class="invalid-data"
        v-if="!formData.email.valid && formData.email.touched"
      >
        Please, enter a valid email!
      </span>
    </div>
    <div class="form-control-container">
      <div class="form-control">
        <input
          type="password"
          id="password"
          class="form-input"
          autocomplete="off"
          placeholder=" "
          formControlName="password"
          @blur="validateInput('password')"
          v-model="formData.password.value"
        />
        <label for="password"> Password </label>
      </div>
      <span
        class="invalid-data"
        v-if="!formData.password.valid && formData.password.touched"
      >
        Please, enter a valid password!
      </span>
    </div>
    <p>
      or sign in with
      <a class="facebook-auth" @click="facebookLogin">Facebook</a>
    </p>
    <button type="submit">{{ buttonText }}</button>
  </form>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const registration = ref(false);
    const formHeader = ref('');
    const buttonText = ref('');

    const formData = reactive({
      email: {
        value: '',
        valid: true,
        touched: false
      },
      password: {
        value: '',
        valid: true,
        touched: false
      },
      isFormValid: false
    });

    function changeVariablesBasedOnRoute(routeValue) {
      if (routeValue === '/register') {
        registration.value = true;
        formData.fullName = {
          value: '',
          valid: true,
          touched: false
        };
        formHeader.value = 'Register';
        buttonText.value = 'Sign up';
      } else {
        formHeader.value = 'Login';
        registration.value = false;
        buttonText.value = 'Sign in';
      }
    }

    changeVariablesBasedOnRoute(route.fullPath);

    watch(() => route.fullPath, changeVariablesBasedOnRoute);

    function validateInput(inputName) {
      if (inputName === 'fullName') {
        formData.fullName.touched = true;
        const validFullName = /^[a-z ,.'-]+$/i;
        const fullNameValue = formData.fullName.value;

        if (!validFullName.test(fullNameValue)) {
          formData.fullName.valid = false;
          return;
        } else {
          formData.fullName.valid = true;
        }
      } else if (inputName === 'email') {
        formData.email.touched = true;
        const validEmail = /^[^\s@]+@[^\s@]+$/;
        const emailValue = formData.email.value;

        if (!validEmail.test(emailValue)) {
          formData.email.valid = false;
          return;
        } else {
          formData.email.valid = true;
        }
      } else if (inputName === 'password') {
        formData.password.touched = true;
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        const passwordValue = formData.password.value;

        if (!validPassword.test(passwordValue)) {
          formData.password.valid = false;
          return;
        } else {
          formData.password.valid = true;
        }
      }
    }

    function validateForm() {
      if (
        formData.email.valid &&
        formData.email.touched &&
        formData.password.valid &&
        formData.password.touched
      ) {
        formData.isFormValid = true;
      } else {
        formData.isFormValid = false;
      }

      if (
        registration.value &&
        (!formData.fullName.valid || !formData.fullName.touched)
      ) {
        formData.isFormValid = false;
      }
    }

    async function submitForm() {
      validateForm();

      if (formData.isFormValid) {
        if (registration.value) {
          store.dispatch('register', formData);
          router.push('login');
        } else {
          const authResult = await store.dispatch('login', formData);
          store.dispatch('setToken', authResult);
          router.push('games');
        }
      }
    }

    async function facebookLogin() {
      store.dispatch('fbLogin').then((result) => {
        store.dispatch('setToken', result);
        router.push('games');
      });
    }

    return {
      formData,
      formHeader,
      registration,
      buttonText,
      validateInput,
      submitForm,
      facebookLogin
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 150px;
  margin-top: 25%;
  color: white;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.4px rgb(128 128 128 / 11%),
    0 1px 1px rgb(128 128 128 / 16%), 0 2.1px 2.1px rgb(128 128 128 / 20%),
    0 4.4px 4.4px rgb(128 128 128 / 24%), 0 12px 12px rgb(128 128 128 / 35%);

  h1 {
    margin: 0 0 24px 0;
    font-size: 2em;
  }

  &-control {
    margin: 12px 0;
    position: relative;
    border-bottom: 1px solid white;
  }

  label {
    position: absolute;
    top: 0.5rem;
    left: 0;
    transition: 0.3s;
    transform-origin: left;
  }

  &-input {
    padding: 0.5rem 0;
    background: 0 0;
    border: none;
    color: white;
    outline: 0;

    &:focus {
      ~ label {
        transform: translateY(-120%) scale(0.75);
      }
    }

    &:not(:placeholder-shown) ~ label {
      transform: translateY(-120%) scale(0.75);
    }
  }

  .facebook-auth {
    cursor: pointer;
    color: rgb(88, 137, 241);
  }

  button {
    width: 100%;
    margin: 18px 0 9px 0;
    padding: 8px 20px;
    border: 1px solid white;
    color: white;
    background: transparent;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      border-color: hsl(196, 78%, 61%);
      color: hsl(196, 78%, 61%);
    }
  }

  .invalid-data {
    color: rgb(255, 82, 82);
    font-size: 0.8em;
  }
}
</style>
