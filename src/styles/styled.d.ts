import "styled-components";
import { Mixins } from "./mixins";
import { Theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
