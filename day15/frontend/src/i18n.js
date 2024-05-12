import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector/cjs";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector).use(initReactI18next)
.use(Backend)
.init({
    debugger: true,
    lng:"en",
    returnObjects: true,
      fallbackLng: "en",
})