interface FormLabelProps {
	htmlFor: string;
	label: string;
}

export default function FormLabel({ htmlFor, label }: FormLabelProps) {
	return (
		<label htmlFor={htmlFor} className='text-slate-200 font-semibold'>
			{label}
		</label>
	);
}
