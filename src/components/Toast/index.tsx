import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export const Toast = ({ message, onClose }: ToastProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>x</Text>
      </TouchableOpacity>
    </View>
  );
};
