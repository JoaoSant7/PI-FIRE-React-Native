import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LocalizacaoStyles } from "./LocalizacaoStyles";

const LocalizacaoScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    try {
      if (!navigator.geolocation) {
        Alert.alert("Erro", "Geolocalização não é suportada neste dispositivo");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          Alert.alert("Erro", "Não foi possível obter a localização");
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Falha ao acessar a localização");
      console.error(error);
    }
  };

  return (
    <View style={LocalizacaoStyles.container}>
      <View style={LocalizacaoStyles.content}>
        <Text style={LocalizacaoStyles.sectionTitle}>Geolocalização</Text>

        <TouchableOpacity
          style={[LocalizacaoStyles.button, LocalizacaoStyles.obterLocalizacao]}
          onPress={getLocation}
          disabled={loading}
        >
          <View style={LocalizacaoStyles.buttonContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#FFF" />
            ) : (
              <Text style={LocalizacaoStyles.buttonText}>
                Obter Localização
              </Text>
            )}
          </View>
        </TouchableOpacity>

        {loading && (
          <View style={LocalizacaoStyles.loadingContainer}>
            <ActivityIndicator size="small" color="#3E4095" />
            <Text style={LocalizacaoStyles.loadingText}>
              Obtendo localização...
            </Text>
          </View>
        )}

        {location && (
          <View style={LocalizacaoStyles.locationContainer}>
            <Text style={LocalizacaoStyles.locationText}>
              Sua localização atual:
            </Text>
            <View style={LocalizacaoStyles.coordinatesContainer}>
              <View style={LocalizacaoStyles.coordinateBox}>
                <Text style={LocalizacaoStyles.coordinateLabel}>LATITUDE</Text>
                <Text style={LocalizacaoStyles.coordinateValue}>
                  {location.latitude.toFixed(6)}
                </Text>
              </View>
              <View style={LocalizacaoStyles.coordinateBox}>
                <Text style={LocalizacaoStyles.coordinateLabel}>LONGITUDE</Text>
                <Text style={LocalizacaoStyles.coordinateValue}>
                  {location.longitude.toFixed(6)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default LocalizacaoScreen;
