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
    store.config = config.data;

  } catch (error) {
    console.error("Error initializing store:", error);
  }
}

initializeStore();
