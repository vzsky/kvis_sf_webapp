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
    <div class='w-full h-screen bg-center bg-cover' style='background-image:url("images/profilebg.jpg");'>
      <div class='w-full h-full content-center justify-center flex'>
        <div class='w-full h-full pt-10 pl-10 pr-10 max-w-5xl'>
          <div> 
            <center><h1 class='mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline text-gray-100'>{firebaseUser['data']['name']}</h1></center>
            <center><h1 class='mt-1 md:mt-2 text-xl sm:text-2xl md:text-2xl font-hairline text-gray-100'>{firebaseUser['data']['country']}</h1></center>
            <center class='flex content-center justify-center'>
              <h1 class='mt-1 md:mt-2 text-xl sm:text-2xl md:text-6xl font-hairline text-red-500'>Buddies:</h1>
              <h1 class='mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-6xl font-hairline text-gray-100'> Nokia</h1>
              <h1 class='mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-6xl font-hairline text-gray-100'>08XXXXXXXX</h1>
            </center>
            <center>
              <h1 class='mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline text-red-500'>Excursion route : 1</h1>
            </center>
            <center class='flex content-center justify-center'>
              <h1 class='mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline text-red-500'>Sci Activities : </h1>
              <h1 class='mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-5xl font-hairline text-gray-100'>1, 2</h1>
            </center>
            <center><h1 class='mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline text-gray-100'>Room {firebaseUser['data']['location_dorm']}</h1></center>
            <center class='flex content-center justify-center'>
              <h1 class='mt-1 md:mt-2 text-xl sm:text-2xl md:text-4xl font-hairline text-red-500'>Research:</h1>
              <h1 class='mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-4xl font-hairline text-gray-100'>{firebaseUser['data']['project_name']}</h1>
            </center>
            <center><h1 class='mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline text-red-500'>Presentation Venue {firebaseUser['data']['location_presentation']}</h1></center>
          </div>
        </div>
      </div>
    </div>
    {:else} 
    <div class="w-full h-screen bg-center bg-cover" style='background-image:url("images/loginbg.jpg");'>
      <div class='w-full flex pt-10 content-center justify-center'>
        <h1 class='font-hairline antialiased text-gray-100 text-6xl font-mono'> WELCOME </h1>
      </div>
      <div class='w-full flex pt-10 content-center justify-center'>
        <img class='max-w-xs w-full h-full' src='/images/issflogo.png' alt='16th issf and 3rd kvis isf logo'>
      </div>
      <div class="w-full flex content-center justify-center">
        <form class="w-full max-w-sm px-8 pt-6 pb-8 mb-4">
            {#if loginInputErrorMsg}
                <h3 class="text-red-300 text-xs italic">
                    An error has occured: {loginInputErrorMsg.code} <br/>
                    {loginInputErrorMsg.message}
                </h3>
            {/if}

            <div class="mb-4">
                <input 
                    bind:value={loginInputUsername}
                    required
                    type="email"
                    id="loginInputUsername"
                    class="bg-gray-700 shadow appearance-none w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="username"
                    style="border-radius: 17px;"
                />
            </div>

            <div class="mb-4">
                <input 
                    bind:value={loginInputPassword}
                    required
                    type="password"
                    id="loginInputPassword"
                    class="bg-gray-700 shadow appearance-none w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="passcode"
                    style="border-radius: 17px;"
                />
            </div>
            <center>
            <button 
                on:click={loginAction}
                type="submit"
                class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                style="border-radius: 17px;"
            >
                Login
            </button>
            </center>
        </form>
      </div>
    </div>
{/if}
