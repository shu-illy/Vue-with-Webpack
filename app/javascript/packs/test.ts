import { createApp } from "vue";
import Tweets from "@/components/Tweets.vue";

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(Tweets);
  console.log(app);
  app.mount("#app");
});
