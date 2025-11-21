import styled from '@emotion/styled';
import NewProjectPage from './pages/it-guidelines/NewProjectPage';
import PrinciplesPage from './pages/it-guidelines/PrinciplesPage';
import SecurityPage from './pages/it-guidelines/SecurityPage';
import HomePage from './pages/HomePage';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AcquisitionPage from './pages/it-guidelines/AcquisitionPage';
import CommunityPage from './pages/it-guidelines/CommunityPage';
import Footer from './components/Footer';
import ImpressumPage from './pages/ImpressumPage';
import ItGuidelinesPage from './pages/ItGuidelinesPage';
import DigitalisationPage from './pages/DigitalisationPage';
import NewDigitalisationProjectPage from './pages/digitalisation/NewDigitalisationProjectPage';
import DocumentationPage from './pages/digitalisation/DocumentationPage';
import CompletionPage from './pages/CompletionPage';
import OrganisationPage from './pages/it-guidelines/OrganisationPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewCompletionProjectPage from './pages/completion/NewCompletionProjectPage';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Nav = styled.nav`
  background-color: var(--color-primary);

  a, button {
    color: white;
    opacity: 1;
    display: block;
    color: white;
    padding: 0.7rem 0.8rem;
    text-decoration: none;
  }
}
`;

export const NavLocation = styled.div`
  font-size: 0.8rem;
`;

export const MainContainer = styled.main`
  padding: 1rem;
  flex-grow: 1;
  width: 100%;

  @media (min-width: 1300px) {
    max-width: 1300px;
    margin: 0 auto;
  }
`;

export const A = styled.a``;

export const Infobox = styled.p`
  background: var(--color-secondary-light);
  color: black;
  padding: 1em;
  border-radius: 8px;
  margin: 1em 0;
`;

export const Box = styled.div`
  display: flex;
  margin-top: 60px;
  border-top: 1px solid white;
`;

const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.add("hidden")
    })
    toggleMenu()
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    const dropdownMenu = (event.target as HTMLElement).parentElement?.querySelector(".dropdown-menu") as HTMLElement;
    if (dropdownMenu.classList.contains("hidden")) {
      // Hide any open dropdown menus before showing the new one
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.add("hidden")
      })

      dropdownMenu.classList.remove("hidden")
    } else {
      dropdownMenu.classList.add("hidden")
    }
  }

  return (
    <Nav>
      <div className="container mx-auto px-4 md:flex gap-6">
        {/* <!-- Logo --> */}
        <div className="flex items-center justify-between md:w-auto w-full">
          <a href="#" className="flex items-center py-5 px-2 text-white flex-1 w-32">
            <span className="font-bold"><FontAwesomeIcon icon={faCompass} /> {t('home_page.title')}</span>
          </a>
          {/* <!-- Mobile Menu Button --> */}
          <div onClick={toggleMenu} className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>bars-3-bottom-left</title>
                <g fill="none">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
        {/* <!-- Primary Navigation --> */}
        <div className={"md:flex md:flex-row flex-col justify-between md:space-x-1 pb-3 md:pb-0 navigation-menu" + (isOpen ? " block" : " hidden")}>
          
          {/* <!-- Dropdown Menu --> */}
          <div className="relative">
            <button onClick={(event) => toggleDropdown(event)} className="dropdown-toggle text-left py-2 px-3 flex gap-2 rounded">
              <span className="pointer-events-none">{t('digitalisation_page.title')}</span>
            </button>
            <div className={"dropdown-menu absolute bg-gray-700 text-white rounded-b-lg pb-2 w-51 hidden z-10"}>
              <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/digitalisation">{t('digitalisation_page.title')}</Link>
              <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/digitalisation/new-project">{t('new_project_digitalisation_page.title')}</Link>
            </div>
          </div>

          <div className="relative">
            <button onClick={(event) => toggleDropdown(event)} className="dropdown-toggle text-left py-2 px-3 flex gap-2 rounded my-auto h-full w-32">
              <span className="pointer-events-none">{t('it_guidelines_page.title')}</span>
            </button>
            <div className={"dropdown-menu absolute bg-gray-700 text-white rounded-b-lg pb-2 w-52 hidden z-10"}>
                <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/it-guidelines">{t('it_guidelines_page.title')}</Link>
                <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/it-guidelines/new-project">{t('new_project_guidelines_page.title')}</Link>
                <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/it-guidelines/principles">{t('principles_page.title')}</Link>
                <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/it-guidelines/security">{t('security_page.title')}</Link>
                <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/it-guidelines/acquisition">{t('acquisition_page.title')}</Link>
                <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/it-guidelines/community">{t('community_page.title')}</Link>
                <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/it-guidelines/organisation">{t('organisation_page.title')}</Link>
            </div>
          </div>

          <div className="relative">
            <button onClick={(event) => toggleDropdown(event)} className="dropdown-toggle text-left py-2 px-3 flex gap-2 rounded">
              <span className="pointer-events-none">{t('completion_page.title')}</span>
            </button>
            <div className={"dropdown-menu absolute bg-gray-700 text-white rounded-b-lg pb-2 w-51 hidden z-10"}>
              <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/completion">{t('completion_page.title')}</Link>
              <Link onClick={closeDropdown} className="block px-6 py-2 hover:font-semibold" to="/completion/new-project">{t('new_project_completion_page.title')}</Link>
            </div>
          </div>
          
        </div>
      </div>
    </Nav>
  );
};

function App() {
  return (
    <Router basename="/">
      <Header></Header>
      <Routes>
        <Route path="/it-guidelines" element={<ItGuidelinesPage />} />
        <Route path="/digitalisation" element={<DigitalisationPage />} />
        <Route path="/completion" element={<CompletionPage />} />
        <Route path="/completion/new-project" element={<NewCompletionProjectPage />} />
        <Route path="/digitalisation/new-project" element={<NewDigitalisationProjectPage />} />
        <Route path="/digitalisation/documentation" element={<DocumentationPage />} />
        <Route path="/it-guidelines/principles" element={<PrinciplesPage />} />
        <Route path="/it-guidelines/acquisition" element={<AcquisitionPage />} />
        <Route path="/it-guidelines/community" element={<CommunityPage />} />
        <Route path="/it-guidelines/organisation" element={<OrganisationPage />} />
        <Route path="/it-guidelines/security" element={<SecurityPage />} />
        <Route path="/it-guidelines/new-project" element={<NewProjectPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default withTranslation()(App);
