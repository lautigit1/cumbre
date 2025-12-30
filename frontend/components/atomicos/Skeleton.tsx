"use client";

import styles from './Skeleton.module.scss';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ width?: string | number; height?: string | number; rounded?: boolean }>;

export function Skeleton({ width = '100%', height = '12px', rounded = true }: Props) {
  return <span className={styles.skeleton} style={{ width, height, borderRadius: rounded ? '999px' : '6px' }} />;
}
