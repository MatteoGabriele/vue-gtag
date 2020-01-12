import { setOptions as _setOptions, install } from "./install";
import _bootstrap from "./bootstrap";

export default install;
export { install };

export const bootstrap = _bootstrap;
export const setOptions = _setOptions;
