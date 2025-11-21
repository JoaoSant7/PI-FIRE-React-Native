import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Share,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import LocalizacaoStyles from "../styles/LocalizacaoStyles";

const LocalizacaoScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  // Verificar e solicitar permissões
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permissão para acessar localização foi negada");
          return;
        }
      } catch (error) {
        console.error("Erro ao solicitar permissão:", error);
        setErrorMsg("Erro ao solicitar permissão de localização");
      }
    })();
  }, []);

  // Obter localização atual
  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // Verificar permissão novamente
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão Necessária",
          "Este app precisa de permissão para acessar sua localização.",
          [
            {
              text: "Configurar",
              onPress: () => Location.requestForegroundPermissionsAsync(),
            },
            { text: "Cancelar", style: "cancel" },
          ]
        );
        setLoading(false);
        return;
      }

      // Obter localização
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
      });

      const { latitude, longitude } = location.coords;

      setLocation({
        latitude,
        longitude,
        accuracy: location.coords.accuracy,
        timestamp: new Date().toLocaleString("pt-BR"),
      });

      // Tentar obter endereço reverso (opcional)
      try {
        let [reverseGeocode] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode) {
          const { city, region, street, name, postalCode } = reverseGeocode;
          const formattedAddress = `${street || name || ""}${
            city ? `, ${city}` : ""
          }${region ? ` - ${region}` : ""}`;
          setAddress(formattedAddress);
        }
      } catch (geocodeError) {
        console.log("Não foi possível obter o endereço:", geocodeError);
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      setErrorMsg(
        "Erro ao obter localização. Verifique se o GPS está ativado."
      );
      Alert.alert("Erro", "Não foi possível obter a localização");
    } finally {
      setLoading(false);
    }
  };

  // Compartilhar localização
  const shareLocation = async () => {
    if (!location) {
      Alert.alert("Aviso", "Obtenha a localização primeiro");
      return;
    }

    try {
      const message = `Minha localização:\nLatitude: ${location.latitude.toFixed(
        6
      )}\nLongitude: ${location.longitude.toFixed(6)}${
        address ? `\nEndereço: ${address}` : ""
      }\n\nEnviado via App Bombeiros`;

      const result = await Share.share({
        message: message,
        title: "Minha Localização",
        url: `https://maps.google.com/?q=${location.latitude},${location.longitude}`,
      });

      if (result.action === Share.sharedAction) {
        console.log("Localização compartilhada com sucesso");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar a localização");
      console.error("Erro ao compartilhar:", error);
    }
  };

  // Abrir no Google Maps
  const openInMaps = () => {
    if (!location) return;

    const url = Platform.select({
      ios: `maps://?q=${location.latitude},${location.longitude}`,
      android: `geo://?q=${location.latitude},${location.longitude}`,
    });

    // Para web ou fallback
    const webUrl = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

    // Aqui você pode usar Linking.openURL(url) se quiser abrir no app nativo
    Alert.alert(
      "Abrir no Maps",
      `Coordenadas: ${location.latitude.toFixed(
        6
      )}, ${location.longitude.toFixed(6)}`,
      [{ text: "Cancelar", style: "cancel" }, { text: "OK" }]
    );
  };

  return (
    <View style={LocalizacaoStyles.container}>
      <View style={LocalizacaoStyles.content}>
        <Text style={LocalizacaoStyles.sectionTitle}>
          Clique no botão abaixo
        </Text>

        {errorMsg && (
          <View style={LocalizacaoStyles.errorContainer}>
            <Text style={LocalizacaoStyles.errorText}>{errorMsg}</Text>
          </View>
        )}

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
              Localização Encontrada
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

            {address && (
              <View style={LocalizacaoStyles.addressContainer}>
                <Text style={LocalizacaoStyles.addressLabel}>
                  ENDEREÇO APROXIMADO
                </Text>
                <Text style={LocalizacaoStyles.addressText}>{address}</Text>
              </View>
            )}

            {location.accuracy && (
              <View style={LocalizacaoStyles.accuracyContainer}>
                <Text style={LocalizacaoStyles.accuracyText}>
                  Precisão: ±{location.accuracy.toFixed(1)} metros
                </Text>
              </View>
            )}

            <View style={LocalizacaoStyles.actionsContainer}>
              <TouchableOpacity
                style={[
                  LocalizacaoStyles.actionButton,
                  LocalizacaoStyles.shareButton,
                ]}
                onPress={shareLocation}
              >
                <Text style={LocalizacaoStyles.actionButtonText}>
                  Compartilhar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  LocalizacaoStyles.actionButton,
                  LocalizacaoStyles.mapsButton,
                ]}
                onPress={openInMaps}
              >
                <Text style={LocalizacaoStyles.actionButtonText}>
                  Ver no Maps
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default LocalizacaoScreen;
