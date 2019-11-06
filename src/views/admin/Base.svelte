<script>
  import { link } from "svelte-spa-router";
</script>

<nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <a href="/" use:link class="font-semibold text-xl tracking-tight">
      KVIS Science Fair Admin Menu
    </a>
  </div>
  <div class="w-full block flex-grow md:flex md:items-center md:w-auto">
    <div class="text-sm md:flex-grow">
      <a
        href="/admin/annoucements"
        class="block px-2 mt-4 md:inline-block md:mt-0 text-blue-100
        hover:text-white mr-4"
        use:link>
        Announcements
      </a>
      <a
        href="/admin/mediacontents"
        class="block px-2 mt-4 md:inline-block md:mt-0 text-blue-100
        hover:text-white mr-4"
        use:link>
        Media and Contents
      </a>
      <a
        href="/admin/userdatabase"
        class="block px-2 mt-4 md:inline-block md:mt-0 text-blue-100
        hover:text-white"
        use:link>
        User and Database
      </a>
      <a
        href="/admin/notifications"
        class="block px-2 mt-4 md:inline-block md:mt-0 text-blue-100
        hover:text-white"
        use:link>
        Notifications
      </a>
      <a
        href="/admin/schedule"
        class="block px-2 mt-4 md:inline-block md:mt-0 text-blue-100
        hover:text-white"
        use:link>
        Schedule/Itinerary
      </a>
    </div>
  </div>
</nav>

<slot />
