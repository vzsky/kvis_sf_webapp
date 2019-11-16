<script>
  export let name, location, begin, end, details;

  function dataChanged(event) {
    console.log(event);
  }

  function getHTMLTimeString(time) {
    let year = time.getFullYear();
    let month =
      (time.getMonth() + 1).toString().length === 1
        ? "0" + (time.getMonth() + 1).toString()
        : time.getMonth() + 1;
    let date =
      time.getDate().toString().length === 1
        ? "0" + time.getDate().toString()
        : time.getDate();
    let hours =
      time.getHours().toString().length === 1
        ? "0" + time.getHours().toString()
        : time.getHours();
    let minutes =
      time.getMinutes().toString().length === 1
        ? "0" + time.getMinutes().toString()
        : time.getMinutes();
    let seconds =
      time.getSeconds().toString().length === 1
        ? "0" + time.getSeconds().toString()
        : time.getSeconds();

    let formattedDateTime =
      year +
      "-" +
      month +
      "-" +
      date +
      "T" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    return formattedDateTime;
  }
</script>

<form
  on:invalid={dataChanged}
  on:changed={dataChanged}
  on:input={dataChanged}
  class="container">
  <br />
  <label for="name" class="text-sm font-bold">Name</label>
  <input
    required
    type="text"
    id="name"
    value={name}
    class="w-64 border-b-2 border-blue-700 focus:outline-none
    focus:shadow-outline" />
  <br />
  <label class="text-sm font-bold">Location</label>
  <input
    required
    type="text"
    id="location"
    value={location}
    class="w-64 border-b-2 border-blue-700 focus:outline-none
    focus:shadow-outline" />
  <br />
  <label class="text-sm font-bold">Begin Time</label>
  <input
    required
    type="datetime-local"
    id="begin"
    value={getHTMLTimeString(new Date(begin))}
    class="border-b-2 border-blue-700 focus:outline-none focus:shadow-outline" />
  <br />
  <label class="text-sm font-bold">End Time</label>
  <input
    required
    type="datetime-local"
    id="end"
    value={getHTMLTimeString(new Date(end))}
    class="border-b-2 border-blue-700 focus:outline-none focus:shadow-outline" />
  <br />
  <label class="text-sm font-bold">Details</label>
  <textarea
    required
    type="text"
    id="details"
    value={details}
    class="w-64 border-b-2 border-blue-700 focus:outline-none
    focus:shadow-outline" />
  <br />
</form>
