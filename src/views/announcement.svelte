<script>
    import Base from "./base.svelte";

    import { link } from "svelte-spa-router";
    import { onMount} from "svelte";
    import { Announcement } from "../firebase.js";

    var Ann = []
    onMount(async () => {
        Ann = await Announcement()
        console.log(Ann);
    });

</script>

<style>
   
</style>

<Base>
    {#each Ann as ann}
        {ann.title} 
    {:else}
        <p> loading </p>
    {/each}
</Base>
