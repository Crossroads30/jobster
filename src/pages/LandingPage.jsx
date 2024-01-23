import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Button, Flex } from 'antd'
import { Logo } from '../components'
import { Link } from 'react-router-dom'


const LandingPage = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			{/* <div className='container page'> */}
			<Flex
				wrap='wrap'
				align='center'
				justify='space-between'
				className='container page'
			>
				<div className='info'>
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Master cleanse edison bulb jawn pinterest. Lomo next level blue
						bottle austin. Chartreuse iceland 90's food truck, vice schlitz
						leggings. Ennui cliche JOMO forage.
					</p>
					<Button type='primary' style={{ background: 'var(--primary-500)' }}>
						<Link to='/register'>Login/Register</Link>
					</Button>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</Flex>
			{/* </div> */}
		</Wrapper>
	)
}

export default LandingPage
