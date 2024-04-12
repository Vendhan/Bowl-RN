import { StyleSheet, View } from "react-native";

export const ListItemSeparator = () => (
    <View style={styles.separator} />
  );

  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: 'rgba(128, 128, 128, 0.4)',
      marginHorizontal: 12
    },
  });