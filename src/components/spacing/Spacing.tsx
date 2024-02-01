import { clsx } from "clsx";

import styles from "./index.module.scss";

export type SpaceSize = 4 | 18 | 30 | 50 | 72;

export const Spacing = ({ size }: { size: SpaceSize }) => {
  const className = `spacing${size}`;
  return <div className={clsx([styles.spacing, styles[className]])}></div>;
};
