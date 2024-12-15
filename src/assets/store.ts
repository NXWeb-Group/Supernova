import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  iframe: undefined as string | undefined,
  navbar: true,
  config: { ai: false, forum: false },
  username: undefined as string | undefined,
  tokens: 0,
  activeroomid: undefined as string | undefined,
});

async function initializeStore() {
  try {
    const forum = await axios.get("/api/forum");
    store.config.forum =
      typeof forum.data === "boolean" ? forum.data : forum.data === "true";
  } catch {
    console.warn("no forum");
  }

  try {
    const config = await axios.get("/api/config");
    store.config.ai =
      typeof config.data === "boolean" ? config.data : config.data === "true";
  } catch {
    console.warn("no ai");
  }
}

initializeStore();
