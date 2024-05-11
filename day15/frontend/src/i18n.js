import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector/cjs";
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector).use(initReactI18next).init({
    debugger: true,
    lng:"en",
    returnObjects: true,

    resources: {
        en: {
          translation: { 
           greeting:" Hello and Welcome",
           description: {
            line1: "You're watching <1>{{channel}}</1> YouTube Channel",
            line2: "This is an Internationalisation Tutorial"
          }
          }
        },
        ne: {
          translation: {
            greeting: " तपाईंलाई स्वागत छ |",
            description:{
              line1:"तपाईं <1>{{channel}}</1> यूट्यूब च्यानल हेरिरहनु भएको छ",
              line2:"यो एक अन्तर्राष्ट्रीयकरण ट्युटोरियल हो"
            }
          }
        },
        fr: {
          translation: {
            greeting: "Bonjour, Bienvenue !",
            description: {
              line1: "Vous regardez la chaîne YouTube <1>{{channel}}</1>",
              line2: "Ceci est un tutoriel d'internationalisation"
            }
          }
        },
      },
      fallbackLng: "en",
})