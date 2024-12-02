import { addRoutesTracker } from "src/router";
import setupEnvironment from "./setup-environment";
import { options } from "./options";

const bootstrap = async (): Promise<void> => {
  const { router } = options;

  setupEnvironment();

  if (router) {
    addRoutesTracker();
  }
};

export default bootstrap;
