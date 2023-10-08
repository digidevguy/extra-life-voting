interface FormInputProps {
	id: string;
	value: string;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
	value = '',
	name,
	onChange,
}: FormInputProps) {
	return (
		<input
			type='text'
			className='p-2 rounded-md'
			value={value}
			name={name}
			onChange={onChange}
		/>
	);
}
