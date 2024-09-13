import { Id, toast } from "react-toastify";

import { NotifyTemplate } from "./NotifyTemplate";
import { NotifyOptions } from "./types";

export const notify = (options: NotifyOptions): Id =>
  toast(
    <NotifyTemplate
      kind={options.kind}
      title={options.title}
      desc={options.desc}
    />
  );
