interface SpacingProps {
	size: 'small' | 'medium' | 'large' | 'xlarge' | 'huge';
}

const Spacing: React.FC<SpacingProps> = ({ size }) => {
	const sizes = {
		small: '4px',
		medium: '24px',
		large: '50px',
		xlarge: '90px',
		huge: '207px',
	};

	return <div style={{ height: sizes[size] }} />;
};

export default Spacing;
