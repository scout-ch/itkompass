
import FooterLogo from './../images/footer.svg?react'
import PBSLogo from './../images/pbs_logo.svg?react'
import ITKomLogo from './../images/ITKom-Logo.png'
import styled from '@emotion/styled';
import i18n from './../i18n';
import { Link } from 'react-router-dom'


const FooterContainer = styled.div`
  padding-top: 100px;
`

const FooterContent = styled.div`
  background-color: var(--color-primary);
`

const FooterNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 50px;

  &>ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`
const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 0 60px;

  &>ul {
    list-style-type: none;
    margin: 0;

    a {
      font-size: 16px;
      color: white;
    }
  }

  .footer-copyright {
    font-size: 13px;
  } 

  .impressum {
    margin-bottom: 10px;

    a {
      text-decoration: none;
    }
  }
`

const FooterImage = styled.div`
  svg {
    display: block;
    width: 100%;
    height: auto;
    fill: var(--color-primary);
  }
`

const Logo = styled.div`
  display: flex;
  svg {
    margin-left: 30px;
    height: 100px;
}
`

const Button = styled.button`
  border: none;
  background: none;
  color: white;
  font-size: 1rem;

  &:hover {
    color: white;
    opacity: 0.5;
  }

  &.active  {
    text-decoration: underline;
  }
`

function Footer() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  const lang = i18n.language

  return <FooterContainer>
    <FooterImage><FooterLogo></FooterLogo></FooterImage>
    <FooterContent>
      <FooterNavigation>
        <Logo>
          <img src={ITKomLogo} width={100} />
          <PBSLogo></PBSLogo>
        </Logo>
        <ul>
          <li>
            <Button className={lang === 'de' ? 'active' : ''} onClick={() => changeLanguage('de')}>Deutsch</Button>&nbsp;
            <Button className={lang === 'fr' ? 'active' : ''} onClick={() => changeLanguage('fr')}>Français</Button>
          </li>
        </ul>
      </FooterNavigation>
      <FooterBottom>
        <p className="footer-copyright">© 2022 Pfadibewegung Schweiz</p>
        <ul>
          <li className="impressum">
            <Link to="/impressum">Impressum</Link>
          </li>
        </ul>
      </FooterBottom>
    </FooterContent>
  </FooterContainer>

}

export default Footer
