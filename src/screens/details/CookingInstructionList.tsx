import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

interface Props {
  cookingInstructions: string[];
}

const CookingInstructionsList: React.FC<Props> = ({cookingInstructions}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, {color: colors.text}]}>Cooking Instructions</Text>
      <FlatList
      scrollEnabled={false}
        data={cookingInstructions}
        renderItem={({item, index}) => {
          return <Text style={[styles.content, {color: colors.text}]}>{`${index+1}. ${item.trimStart()}`}</Text>;
        }}
        keyExtractor={item => `${item}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 16,
  },
  title: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 20,
  },
  content: {
    marginBottom: 8,
    fontSize: 16,
  },
});

export default CookingInstructionsList;
