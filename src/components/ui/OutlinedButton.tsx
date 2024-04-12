import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  isWishlisted: Boolean;
  title: string;
  onPress: () => void;
  iconName: string;
}

const OutlinedButton: React.FC<Props> = ({
  isWishlisted,
  title,
  onPress,
  iconName,
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, {borderColor: isWishlisted ? 'red' : 'blue'}]}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={[styles.text, {color: isWishlisted ? 'red' : 'blue'}]}>
          {title}
        </Text>
        <Ionicons
          name={iconName}
          size={24}
          color={isWishlisted ? 'red' : 'blue'}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default OutlinedButton;
