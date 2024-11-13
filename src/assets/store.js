import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  navbar: true,
  config: {ai: false, forum: false},
  username: null,
  tokens: 0,
  activeroomid: null,
});

async function initializeStore() {
  try {
    const config = await axios.get("/api/config");
    store.config.ai = config.data;
    const forum = await axios.get("/api/forum");
    store.config.forum = forum.data;
    console.log(store.config.forum)

  } catch (error) {
    console.error("Error initializing store:", error);
  }
}

initializeStore();
