<script>
import { defineProps, ref } from "vue";

// type Tweet = {
//   id: number;
//   description: string;
// };

// type Props = {
//   tweets: Tweet[];
//   deleteTweet: (id: number) => void;
// };

// defineProps<Props>();
export default {
  name: "Tweets",
  setup() {
    const message = ref("Hello World");

    return {
      message,
    };
  },
};
</script>

<template>
  <!-- <li v-for="tweet in tweets" v-bind:key="tweet.id" class="tweet-list">
    <span>{{ tweet.description }}</span>
    <button @click="deleteTweet(tweet.id)" class="delete-button">delete</button>
  </li> -->
  <div>Vueコンポーネント</div>
</template>

<style scoped>
.tweet-list {
  list-style: none;
  margin-bottom: 12px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(204, 219, 233);
  padding: 8px 20px;
  width: 300px;
}

.delete-button {
  color: #fff;
  font-weight: bold;
  background-color: #c99a68;
  border-radius: 2px;
  border: none;
  width: 60px;
  height: 22px;
}

.delete-button:hover {
  background-color: #b87c38;
}
</style>
