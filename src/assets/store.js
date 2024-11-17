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
    const forum = await axios.get("/api/forum");
    store.config.forum = forum.data;
  } catch (error) {
    console.warn("no form");
  }
  try {
    const config = await axios.get("/api/config");
    store.config.ai = config.data;
  } catch (error) {
    console.warn("no ai");
  }
}

initializeStore();
