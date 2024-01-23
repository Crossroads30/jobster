import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import { Button } from 'antd'

const Landing = () => {
	return (
		<main>
			<nav>
				<img src={logo} alt='logo' className='logo' />
			</nav>
				<div className='container page'>
					<div className='info'>
						<h1>
							job <span>tracking</span> app
						</h1>
						<p>
							Master cleanse edison bulb jawn pinterest. Lomo next level blue
							bottle austin. Chartreuse iceland 90's food truck, vice schlitz
							leggings. Ennui cliche JOMO forage.
						</p>
						<Button type='primary' style={{background: ''}}>Login/Register</Button>
					</div>
					<img src={main} alt='job hunt' className='img main-img' />
				</div>
		</main>
	)
}
export default Landing
