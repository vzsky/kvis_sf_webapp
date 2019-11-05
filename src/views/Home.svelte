<script>
  import Base from "./base.svelte";

  import { auth, db } from "../firebase.js";
  import { authState } from "rxfire/auth";

  let firebaseUser;

  let loginInputUsername = "";
  let loginInputPassword = "";
  let loginInputErrorMsg = null;
  let loginInputRoleMsg = "";

  const firebaseUserSubscription = authState(auth).subscribe(user => {
    firebaseUser = user;
    if (user != null) {
      db.collection("/user_roles")
        .doc(user["uid"])
        .get()
        .then(snapshot => {
          loginInputRoleMsg = snapshot.get("role");
        })
        .catch(error => {
          window.alert(
            `An error has occured in user role retrieval: ${error["code"]}`
          );
          console.error(error);
        });
    }
  });

  function loginAction() {
    loginInputErrorMsg = null;
    auth
      .signInWithEmailAndPassword(loginInputUsername, loginInputPassword)
      .catch(error => {
        loginInputErrorMsg = error;
      });
  }
</script>

<style>

</style>

<Base>
  {#if firebaseUser}
    <div
      class="container mx-auto my-auto flex flex-col flex-no-wrap items-center
      justify-center">

      <h1 class="text-2xl p-2">Logged in as: {firebaseUser['email']}</h1>
      <h3 class="text-sm">User ID: {firebaseUser['uid']}</h3>

      {#if loginInputRoleMsg}
        <h6 class="text-sm">Role: {loginInputRoleMsg}</h6>

        {#if loginInputRoleMsg !== 'admin'}
          <div class="bg-red-300 rounded p-4 m-4">
            <h3 class="text-red-900 text-xl">
              You do not have admin permission.
            </h3>
            <p class="text-xs">
              While you can still access this menu, please remember that this is
              intended for the staff only. Most features
              <b>should not</b>
              work without admin permission. If you've found any features that
              works without admin permission (beyond what is capable with the
              official app), please let us know :)
            </p>
          </div>
        {/if}
      {:else}
        <h6 class="text-sm">Role: Retrieving user role.</h6>
      {/if}

      <button
        on:click={() => auth.signOut()}
        class="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-6
        rounded align-bottom object-bottom m-6">
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
          An error has occured: {loginInputErrorMsg.code}
          <br />
          {loginInputErrorMsg.message}
        </h3>
      {/if}

      <div class="p-2 flex-inital">
        <label for="loginInputUsername" class="text-sm font-bold block">
          Username
        </label>
        <input
          bind:value={loginInputUsername}
          required
          type="email"
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
        rounded">
        Login
      </button>

    </form>
  {/if}
</Base>
