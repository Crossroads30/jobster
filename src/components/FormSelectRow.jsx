const FormSelectRow = ({ name, labeltext, value, handleChange, list }) => {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labeltext || name}
			</label>
			<select
				id={name}
				name={name}
				labeltext={labeltext}
				className='form-select'
				value={value}
				onChange={handleChange}
			>
				{list.map((itemValue, index) => {
					return (
						<option key={index} value={itemValue}>
							{itemValue}
						</option>
					)
				})}
			</select>
		</div>
	)
}
export default FormSelectRow
