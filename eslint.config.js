import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";

export default [
  {
    name: "app/files-to-lint",
    files: ["src/**/*.{js,ts,mts,vue}"],
  },
  {
    name: "app/files-to-ignore",
    ignores: ["**/*", "!src/**"],
  },
  // {
  //   name: 'app/files-to-ignore',
  //   ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/server/**', '**/scramjet/**'],
  // },

  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
];
