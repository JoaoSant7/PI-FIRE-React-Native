// contexts/SettingsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null); // null enquanto carrega
  const [loading, setLoading] = useState(true);

  // Carregar configurações do AsyncStorage ao iniciar
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem("@settings");
        if (saved) {
          setSettings(JSON.parse(saved));
        } else {
          // Valores padrão
            setSettings({
              notifications: true,
              darkMode: false,
              sound: true,
              vibration: true,
              // escala de fonte global (1 = padrão). Pode ser 0.9 (pequeno), 1.2 (grande).
              fontScale: 1,
            });
        }
      } catch (e) {
        setSettings({
          notifications: true,
          darkMode: false,
          sound: true,
          vibration: true,
          fontScale: 1,
        });
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  // Atualizar configuração e salvar no AsyncStorage
  const updateSetting = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await AsyncStorage.setItem("@settings", JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);