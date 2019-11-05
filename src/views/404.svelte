<script>
  import { link } from "svelte-spa-router";
  import Base from "./Base.svelte";
</script>

<style>

</style>

<Base>
  <section class="container content-center align-middle">
    <h1 class="text-5xl text-center">Page not found!</h1>
    <h5 class="text-xl text-center">
      Return to the
      <a href="/" use:link class="text-blue-700 inline">homepage</a>
    </h5>
  </section>
</Base>
