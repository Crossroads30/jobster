import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'
import { Button, Flex } from 'antd'

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<img src={logo} alt='logo' className='logo' />
			</nav>
			{/* <div className='container page'> */}
			<Flex wrap='wrap' align='center' justify='space-between' className='container page'>
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
						Login/Register
					</Button>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</Flex>
			{/* </div> */}
		</Wrapper>
	)
}

const Wrapper = styled.main`
	nav {
		width: var(--fluid-width);
		max-width: var(--max-width);
		margin: 0 auto;
		height: var(--nav-height);
		display: flex;
		align-items: center;
	}
	.page {
		min-height: calc(100vh - var(--nav-height));
		margin-top: -3rem;
	}
	h1 {
		font-weight: 700;
		span {
			color: var(--primary-500);
		}
	}
	p {
		color: var(--grey-600);
	}
	.main-img {
		display: none;
	}
  @media (min-width: 992px) {
.page {
  flex-wrap: nowrap;
  gap: 3rem;
}
.main-img {
  display: block;
  width: 450px;
  gap: 3rem;
}
  }
`

export default Landing
