// import styled from '@emotion/styled'
;
import { Helmet } from 'react-helmet';
import { A, Box, MainContainer } from '../App';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from '@emotion/react';
import { faCompass } from '@fortawesome/free-solid-svg-icons';

const buttonStyle = css`
  font-size: 1em;
  padding: 0.5em;
  text-align: center;
  min-width: 5em;
  background-color: #ddd;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    /* background-color: #eee; */
    outline: 3px solid var(--color-primary);
    text-decoration: none;
  }
`;

export const Button = styled.button`
  font-size: 1em;
  padding: 0.5em;
  text-align: center;
  min-width: 5em;
  background-color: #ddd;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  align-content: center;

  &:hover {
    /* background-color: #eee; */
    outline: 3px solid var(--color-primary);
    text-decoration: none;
  }
`

export const Card = styled.div`
  background-color: var(--color-secondary-light);
  border-radius: 5px;
  padding: 1.5rem;
  display:grid;
  gap: 1.5rem;
  grid-template-rows: subgrid;
  grid-row: span 3;

  &>* {
    margin: 0;
  }

  a {
    background-color: var(--color-primary-light);
    color: white;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));

  @media (max-width: 420px) {
    gap: 1rem;
  }
`;

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Helmet>
        <title>{t('home_page.title')}</title>
      </Helmet>
      <h1>
        <FontAwesomeIcon icon={faCompass} /> {t('home_page.title')}
      </h1>
      <p>{t('home_page.introduction')}</p>
        <h2>{t('home_page.content')}</h2>
        <ButtonContainer>
          <Card>
            <h2>1. {t('home_page.digitalisation.title')}</h2>
            <p>{t('home_page.digitalisation.teaser')}</p>
            <Link css={buttonStyle} to="/digitalisation">{t('home_page.digitalisation.button')}</Link>
          </Card>
          <Card>
            <h2>2. {t('home_page.it_guidelines.title')}</h2>
            <p>{t('home_page.it_guidelines.teaser')}</p>
            <Link css={buttonStyle} to="/it-guidelines">{t('home_page.it_guidelines.button')}</Link>
          </Card>
          <Card>
            <h2>3. {t('home_page.completion.title')}</h2>
            <p>{t('home_page.completion.title')}</p>
            <Link css={buttonStyle} to="/completion">{t('home_page.completion.button')}</Link>
          </Card>
        </ButtonContainer>

      <Box>
        <div>
          <A href="https://scout-ch.github.io/it-landscape/">IT-Landscape</A>
        </div>
      </Box>

      <Box>
        <div>
          <h3>{t('home_page.contact')}</h3>
          <ul>
            <li>
              <A href="mailto:itkom@pbs.com">{t('home_page.mail')}</A>
            </li>
            <li>
              <A href="https://github.com/scout-ch">{t('home_page.github')}</A>
            </li>
            <li>
              <A href="https://db.scout.ch/de/groups/2/mailing_lists/1564">{t('home_page.newsletter')}</A>
            </li>
          </ul>
        </div>
      </Box>
    </MainContainer>
  );
}
