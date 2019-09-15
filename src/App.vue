<template>
  <div id="app">
    <h1>Wlcome to SCMP polls</h1>
    <PollList />
  </div>
</template>

<script>
import PollList from "./components/PollList.vue";

export default {
  name: "app",
  components: {
    PollList
  }
};
</script>
