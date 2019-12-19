<script>
  import { onMount, onDestroy } from "svelte";
  import { auth, authUserObservable, getEmailByUsername } from "../firebase.js";

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let firebaseUser;
  let firebaseUserSubscription;

  onMount(() => {
    firebaseUserSubscription = authUserObservable.subscribe(user => {
      firebaseUser = user;
    });
  });

  onDestroy(() => {
    firebaseUserSubscription.unsubscribe();
  });

  $: console.log(firebaseUser);

  let loginInputUsername = "";
  let loginInputPassword = "";
  let loginInputErrorMsg = null;

  function loginAction() {
    loginInputErrorMsg = null;

    if (emailRegex.test(loginInputUsername)) {
      auth
        .signInWithEmailAndPassword(loginInputUsername, loginInputPassword)
        .catch(error => {
          loginInputErrorMsg = error;
        });
    } else {
      getEmailByUsername({ username: loginInputUsername })
        .then(result => {
          if (result.data.email) {
            auth
              .signInWithEmailAndPassword(result.data.email, loginInputPassword)
              .catch(error => {
                loginInputErrorMsg = error;
              });
          } else {
            loginInputErrorMsg =
              "Unable to sign in. Please contact staff for assistance. \n(Error Detail: email field in user document is null)";
          }
        })
        .catch(error => {
          console.error(error);
          loginInputErrorMsg = error;
        });
    }
  }
</script>

{#if firebaseUser}
  <div
    class="container mx-auto my-auto flex flex-col flex-no-wrap items-center
    justify-center">

    <h1 class="text-2xl p-2">Logged in as: {firebaseUser['user']['email']}</h1>
    <h3 class="text-sm">User ID: {firebaseUser['user']['uid']}</h3>

    <button
      on:click={() => auth.signOut()}
      class="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-6 rounded
      align-bottom object-bottom m-6">
      Logout
    </button>
  </div>
{:else}
  <form
    on:submit|preventDefault={loginAction}
    class="container mx-auto my-auto flex flex-col flex-no-wrap items-center
    justify-center">

    <h1 class="text-2xl p-2">Please Login</h1>

    {#if loginInputErrorMsg}
      <h3 class="p-2 text-red-700">
        An error has occured:
        <br />
        {loginInputErrorMsg}
      </h3>
    {/if}

    <div class="p-2 flex-inital">
      <label for="loginInputUsername" class="text-sm font-bold block">
        Username
      </label>
      <input
        bind:value={loginInputUsername}
        required
        type="text"
        id="loginInputUsername"
        class="w-64 border-b-2 border-blue-700 focus:outline-none
        focus:shadow-outline" />
    </div>

    <div class="p-2 flex-inital">
      <label for="loginInputPassword" class="text-sm font-bold block">
        Password
      </label>
      <input
        bind:value={loginInputPassword}
        required
        type="password"
        id="loginInputPassword"
        class="w-64 border-b-2 border-blue-700 focus:outline-none
        focus:shadow-outline" />
    </div>

    <button
      on:click={loginAction}
      type="submit"
      class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-6
      rounded elevation-2 hover:elevation-6">
      Login
    </button>

  </form>
{/if}
