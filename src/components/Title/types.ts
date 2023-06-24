import {HTMLAttributes} from 'react';

export type Level = 1 | 2 | 3 | 4 | 5 | 6

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
	level?: Level;
}
