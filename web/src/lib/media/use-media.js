import { useContext } from "react";
import { MediaContext } from "./context";

export const useMedia = () => useContext(MediaContext);
