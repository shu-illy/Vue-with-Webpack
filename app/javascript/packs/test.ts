import { createApp } from "vue";
import Tweets from "../src/components/Tweets.vue";

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(Tweets);
  console.log(app);
  app.mount("#app");
});
