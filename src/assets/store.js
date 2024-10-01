import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  openai: null,
  username: null,
  tokens: 0,
})

async function initializeStore() {
  try {
    const config = await axios.get("/api/config");
    store.openai = config.data;
    if (store.openai) {
      const response = await axios.get("/api/user");
      store.username = response.data.username;
      store.tokens = response.data.tokens || 0;
    }
  } catch (error) {
    console.error("Error initializing store:", error);
  }
}

initializeStore();