import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  headerTitle: string;
  paragraph: string;
}

const ParagraphWithHeader: React.FC<Props> = ({headerTitle, paragraph}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={[style.title, {color: colors.text}]}>{headerTitle}</Text>
      <Text style={[style.description, {color: colors.text}]}>{paragraph}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    marginTop: 16,
    fontWeight: '600',
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'justify',
  },
});

export default ParagraphWithHeader;
