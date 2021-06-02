import styled from '@emotion/styled'
import React, { useState } from 'react'
import ClippyStage from '../components/ClippyStage'
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet'

const MainContainer = styled.main`
  padding: 1rem;
  flex-grow: 1;
`

const Slide = styled.section<{ show?: boolean }>`
  display: ${props => props.show ? 'block' : 'none'};
  word-break: break-all;
`

const ButtonContainer = styled.div`
  margin-top: 1.5em;
  display: flex;
`

const Button = styled.button`
  font-size: 1em;
  padding: .5em;
  text-align: center;
  min-width: 5em;
  background-color: #DDD;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #EEE;
  }

  & + & {
    margin-left: 1em;
  }
`

type State = {
  currentSlide: string;
  clippyVariant: "" | "focus" | "rolleye" | 'angry';
  projectPhase?: "idea" | "implementation";
  targetAudience?: "bundesebene" | "canton" | "external"
  toolType?: "dataProcessing" | "contentOnly"
  sensitiveData?: "yes" | "no" | "maybe"
  loginNeeded?: "yes" | "no"
  apiNeeded?: "midata" | "other" | "no"
  similarToolAvailable?: "yes" | "no" | "maybe"
  responsibility?: "yes" | "no" | "maybe"
}

const defaultState = (): State => ({ currentSlide: 'projectPhase', clippyVariant: 'focus' })

export default function NewProjectPage() {
  const [state, setState] = useState<State>(defaultState)
  const updateState = (newState: Partial<State>) => setState(prevState => ({ ...prevState, ...newState }))
  const { t } = useTranslation()
  const isCurrentSlide = (slide: string) => state.currentSlide === slide;

  return <MainContainer>
    <Helmet>
      <title>{t('new_project_page.title')}</title>
    </Helmet>
    <h1>Neues Projekt</h1>
    <ClippyStage variant={state.clippyVariant}>
      <Slide show={isCurrentSlide("projectPhase")}>
        <p>{t("slides.projectPhase.text")}</p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'targetAudience', projectPhase: 'idea' })}>{t("slides.projectPhase.buttons.idea")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'targetAudience', projectPhase: 'implementation' })}>{t("slides.projectPhase.buttons.implementation")}</Button>
        </ButtonContainer>
      </Slide>
      <Slide show={isCurrentSlide("targetAudience")}>
        <p>{t("slides.targetAudience.text")}</p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'toolType', targetAudience: "bundesebene" })}>{t("slides.targetAudience.buttons.bundesebene")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'toolType', targetAudience: "canton" })}>{t("slides.targetAudience.buttons.canton")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'toolType', targetAudience: "external" })}> {t("slides.targetAudience.buttons.external")}</Button >
        </ButtonContainer >
      </Slide >
      <Slide show={isCurrentSlide("toolType")}>
        <p>{t("slides.toolType.text")}</p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'sensitiveData', toolType: "dataProcessing" })}>{t("slides.toolType.buttons.dataProcessing")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'sensitiveData', toolType: "contentOnly" })}>{t("slides.toolType.buttons.contentOnly")}</Button>
        </ButtonContainer >
      </Slide >
      <Slide show={isCurrentSlide("sensitiveData")}>
        <p>{t("slides.sensitiveData.text")}</p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'loginNeeded', sensitiveData: "yes" })}>{t("slides.sensitiveData.buttons.yes")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'loginNeeded', sensitiveData: "no" })}>{t("slides.sensitiveData.buttons.no")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'loginNeeded', sensitiveData: "maybe" })}> {t("slides.sensitiveData.buttons.maybe")}</Button >
        </ButtonContainer >
      </Slide >
      <Slide show={isCurrentSlide("loginNeeded")}>
        <p>{t("slides.loginNeeded.text")}</p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'apiNeeded', loginNeeded: "yes" })}>{t("slides.loginNeeded.buttons.yes")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'apiNeeded', loginNeeded: "no" })}>{t("slides.loginNeeded.buttons.no")}</Button>
        </ButtonContainer >
      </Slide >
      <Slide show={isCurrentSlide("apiNeeded")}>
        <p>{t("slides.apiNeeded.text")}</p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'similarToolAvailable', apiNeeded: "midata" })}>{t("slides.apiNeeded.buttons.midata")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'similarToolAvailable', apiNeeded: "other" })}>{t("slides.apiNeeded.buttons.other")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'similarToolAvailable', apiNeeded: "no" })}>{t("slides.apiNeeded.buttons.no")}</Button>
        </ButtonContainer >
      </Slide >
      <Slide show={isCurrentSlide("similarToolAvailable")}>
        <p>{t("slides.similarToolAvailable.text")}</p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'responsibility', similarToolAvailable: "yes" })}>{t("slides.similarToolAvailable.buttons.yes")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'responsibility', similarToolAvailable: "no" })}>{t("slides.similarToolAvailable.buttons.no")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'similarToolAvailableMaybe', clippyVariant: 'angry' })}>{t("slides.similarToolAvailable.buttons.maybe")}</Button>
        </ButtonContainer >
      </Slide >
      <Slide show={isCurrentSlide("similarToolAvailableMaybe")}>
        <p>
          <Trans t={t}>slides.similarToolAvailableMaybe.text</Trans>
        </p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'similarToolAvailable', clippyVariant: "" })}>{t("slides.similarToolAvailableMaybe.buttons.ok")}</Button>
        </ButtonContainer >
      </Slide >
      <Slide show={isCurrentSlide("responsibility")}>
        <p>{t("slides.responsibility.text")}</p>
        <ButtonContainer>
          <Button type="button" onClick={() => updateState({ currentSlide: 'evaluation', responsibility: "yes" })}>{t("slides.responsibility.buttons.yes")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'evaluation', responsibility: "no" })}>{t("slides.responsibility.buttons.no")}</Button>
          <Button type="button" onClick={() => updateState({ currentSlide: 'evaluation', responsibility: "maybe" })}>{t("slides.responsibility.buttons.maybe")}</Button>
        </ButtonContainer >
      </Slide >
      <Slide show={isCurrentSlide("evaluation")}>
        <p>{t("slides.evaluation.text")}</p>
        <h2>{t("slides.evaluation.todo.title")}</h2>
        <ul>
          <li>{t("slides.evaluation.todo.contact_itkom")}</li>
          {state["responsibility"] !== 'yes' && <li>{t("slides.evaluation.todo.define_po")}</li>}
          {state["apiNeeded"] === 'midata' && <li>{t("slides.evaluation.todo.define_api_consumption")}</li>}
          {state["similarToolAvailable"] === 'maybe' && <li>{t("slides.evaluation.todo.check_existing")}</li>}
          {(state["loginNeeded"] === 'no' && state["sensitiveData"] === 'yes') && <li>{t("slides.evaluation.todo.check_login")}</li>}
        </ul>

        <h2>{t("slides.evaluation.answers.title")}</h2>
        {console.log(state)}
        <p><em>{t('slides.projectPhase.text')}:</em><br /> {t(`slides.projectPhase.buttons.${state.projectPhase}`)}</p>
        <p><em>{t('slides.targetAudience.text')}:</em><br /> {t(`slides.targetAudience.buttons.${state.targetAudience}`)}</p>
        <p><em>{t('slides.toolType.text')}:</em><br /> {t(`slides.toolType.buttons.${state.toolType}`)}</p>
        <p><em>{t('slides.sensitiveData.text')}:</em><br /> {t(`slides.sensitiveData.buttons.${state.sensitiveData}`)}</p>
        <p><em>{t('slides.loginNeeded.text')}:</em><br /> {t(`slides.loginNeeded.buttons.${state.loginNeeded}`)}</p>
        <p><em>{t('slides.apiNeeded.text')}:</em><br /> {t(`slides.apiNeeded.buttons.${state.apiNeeded}`)}</p>
        <p><em>{t('slides.similarToolAvailable.text')}:</em><br /> {t(`slides.similarToolAvailable.buttons.${state.similarToolAvailable}`)}</p>
        <p><em>{t('slides.responsibility.text')}:</em><br /> {t(`slides.responsibility.buttons.${state.responsibility}`)}</p>
      </Slide>

    </ClippyStage >
  </MainContainer >
}
