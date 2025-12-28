"use client";

import styles from './InputSoberano.module.scss';
import { InputHTMLAttributes, forwardRef } from 'react';

export const InputSoberano = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return <input ref={ref} className={styles.input} {...props} />;
  },
);

InputSoberano.displayName = 'InputSoberano';
