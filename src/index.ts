import { App } from "vue";
import { PartialOptions, setOptions } from "src/options";
import bootstrap from "src/bootstrap";

const VueGtag = {
  install: (_: App, options: PartialOptions) => {
    setOptions(options);
    bootstrap();
  },
};

export default VueGtag;
