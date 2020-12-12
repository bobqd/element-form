import Vue from "vue";

declare module '@tiger/form' {
    export default class Form {
      static name: string;
      static install(vue: typeof Vue): void;
    }
  }
  