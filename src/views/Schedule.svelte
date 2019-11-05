<script>
  import Base from "./base.svelte";

  import { db } from "../firebase.js";
  import { collection } from "rxfire/firestore";

  let scheduleGroups = db.collection("/schedules");

  let scheduleDocs = [];
  let scheduleActiveDoc;
  let scheduleActiveDocIdx;

  const scheduleEditAudienceOptions = ["students", "teachers"];

  let scheduleEditAudience;
  let scheduleEditData;

  function reloadData() {
    scheduleDocs = [];
    scheduleActiveDoc = null;
    scheduleActiveDocIdx = null;
    scheduleGroups
      .get()
      .then(snapshot => {
        scheduleDocs = snapshot.docs;
      })
      .catch(error => {
        window.alert(
          `An error has occured in reading schedules: ${error["code"]}`
        );
        console.error(error);
      });
  }

  function saveData() {}

  reloadData();
</script>

<style>

</style>

<Base>
  <p class="text-xs m-2 p-2 bg-yellow-300 rounded shadow">
    Schedules are organized into groups. Each groups store the individual
    schedule data along with additional information such as whom this schedule
    is intended for (teachers or students). Each group should be limited to no
    more than 250 induvidual schedules (this is due to technical size limit on
    the database, althogh it is not likely that this will be exceeded).
    <br />
    To edit the schedules: select one of the group, make your changes, then
    click the "Save" button. Note that the save button only save the changes
    done to the selected group; switching to another group without saving will
    discard all changes.
  </p>
  <span>
    <button
      on:click={reloadData}
      class="bg-green-700 hover:bg-green-900 text-white text-sm m-2 py-2 px-4
      rounded shadow">
      Reload
    </button>
    <button
      on:click={e => window.alert('This feature has not been implemented (yet).')}
      class="bg-green-700 hover:bg-green-900 text-white text-sm m-2 py-2 px-4
      rounded shadow">
      New Group
    </button>
    <button
      on:click={e => window.alert('This feature has not been implemented (yet).')}
      class="bg-green-700 hover:bg-green-900 text-white text-sm m-2 py-2 px-4
      rounded shadow">
      Save Changes
    </button>
  </span>
  <span class="m-0 p-0 w-full flex flex-wrap">
    <aside class="w-full md:max-w-xs md:border-r-4">

      <li class="bg-gray-400 text-black text-center">Groups</li>
      {#each scheduleDocs as doc, idx}
        <li
          class="border-2 border-gray-400 w-full text-center {scheduleActiveDocIdx === idx ? 'bg-blue-300' : ''}"
          on:click={e => {
            scheduleActiveDocIdx = idx;
            scheduleActiveDoc = scheduleDocs[scheduleActiveDocIdx];
          }}>
          {doc.id}
        </li>
      {/each}

    </aside>
    <section class="flex-1 px-2">
      {#if scheduleActiveDoc}
        <label>Audience:</label>
        <select bind:value={scheduleEditAudience}>
          {#each scheduleEditAudienceOptions as audience}
            <option
              value={audience}
              selected={scheduleActiveDoc.data()['audience'] == audience}>
              {audience}
            </option>
          {/each}
        </select>

        {#each scheduleActiveDoc.data()['events'] as event, idx}
          <p>{JSON.stringify(event)}</p>
        {/each}
      {:else}
        <h1 class="text-2xl text-center">No Group Selected.</h1>
      {/if}
    </section>
  </span>
</Base>
