import { reactive } from "vue";

export const store = reactive({
  config: { ai: false, forum: false },
  iframe: undefined as string | undefined,
  navbar: true,
  isLoading: false,
  username: undefined as string | undefined,
  tokens: 0,
  activeroomid: undefined as string | undefined,
});

async function initializeStore() {
  try {
    const forumResponse = await fetch("/api/forum");
    const forumData = await forumResponse.json();
    store.config.forum =
      typeof forumData === "boolean" ? forumData : forumData === "true";
  } catch {
    console.warn("no forum");
  }

  try {
    const configResponse = await fetch("/api/config");
    const configData = await configResponse.json();
    store.config.ai =
      typeof configData === "boolean" ? configData : configData === "true";
  } catch {
    console.warn("no ai");
  }
}

initializeStore();
