import { useTranslation } from 'react-i18next';
import './App.css'
import LangSelector from './components/LangSelector';

function App() {

  const { t } = useTranslation();

  const {line1,line2} = t("description",{
    something:"This"
  });

  return (
    <div className='container'>
      <LangSelector/>
      <h1>{t("greeting")}</h1>
      <p>
      {line1}
      </p>
      <p>
      {line2}
      </p>
    </div>
  )
}

export default App

// npm install react-i18next i18next i18next-browser-languagedetector --save~