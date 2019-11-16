<script>
  import Base from "./base.svelte";
  import ScheduleDocEditor from "../../widgets/ScheduleDocEditor.svelte";

  import { db } from "../../firebase.js";
  import { collection } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  import get from "lodash/get";

  let scheduleGroups = db.collection("/schedules");

  let scheduleDocs = collection(scheduleGroups).pipe(startWith([]));
  let scheduleActiveDoc;

  const scheduleEditAudienceOptions = ["Student", "Teacher"];

  let scheduleEditAudience;
  let scheduleEditData;
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
  <span class="m-0 p-0 w-full flex flex-wrap">
    <aside class="w-full md:max-w-xs md:border-r-4">

      <li class="bg-gray-400 text-black text-center">
        Groups
        <button
          on:click={e => window.alert('This feature has not been implemented (yet).')}
          class="bg-green-700 hover:bg-green-900 text-white text-xs m-2 p-1
          rounded shadow">
          New Group
        </button>
      </li>
      {#each $scheduleDocs as doc}
        <li
          class="border-2 border-gray-400 w-full text-center {get(scheduleActiveDoc, 'id') === doc['id'] ? 'bg-blue-300' : ''}"
          on:click={e => {
            scheduleActiveDoc = doc;
          }}>
          {doc['id']}
        </li>
      {/each}

    </aside>
    <section class="flex-1 px-2">
      {#if scheduleActiveDoc}
        <button
          on:click={e => window.alert('This feature has not been implemented (yet).')}
          class="bg-red-700 hover:bg-red-900 text-white text-xs m-2 p-1 rounded
          shadow">
          Delete Group
        </button>
        <button
          on:click={e => window.alert('This feature has not been implemented (yet).')}
          class="bg-green-700 hover:bg-green-900 text-white text-xs m-2 p-1
          rounded shadow">
          Export Group
        </button>
        <button
          on:click={e => window.alert('This feature has not been implemented (yet).')}
          class="bg-green-700 hover:bg-green-900 text-white text-xs m-2 p-1
          rounded shadow">
          Save Changes
        </button>
        <h6 class="font-bond text-xl">Group: {scheduleActiveDoc['id']}</h6>
        <label>Audience:</label>
        <select bind:value={scheduleEditAudience}>
          {#each scheduleEditAudienceOptions as audience}
            <option
              value={audience}
              selected={scheduleActiveDoc.get('audience') == audience}>
              {audience}
            </option>
          {/each}
        </select>

        <form>
          {#each scheduleActiveDoc.get('events') as event}
            <ScheduleDocEditor
              name={event['name']}
              location={event['location']}
              begin={event['begin']}
              end={event['end']}
              details={event['details']} />
          {/each}
        </form>
      {:else}
        <h1 class="text-2xl text-center">No Group Selected.</h1>
      {/if}
    </section>
  </span>
</Base>
