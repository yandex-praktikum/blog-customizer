// Декларации для SVG-файлов с React-компонентами
declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement>
	>;
	const src: string;
	export default src;
}

// Декларации для изображений
declare module '*.png';
declare module '*.jpg';

// Декларации для JSON-файлов
declare module '*.json';

// Декларации для CSS-модулей
declare module '*.module.css';

// Декларации для SCSS/SASS-модулей
declare module '*.module.scss';
declare module '*.module.sass';
