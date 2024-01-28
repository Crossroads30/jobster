import Wrapper from '../assets/wrappers/JobInfo'

const jobInfo = () => {
	return (
		<Wrapper>
			<span className='icon'>{icon}</span>
			<span className='text'>{text}</span>
		</Wrapper>
	)
}
export default jobInfo
