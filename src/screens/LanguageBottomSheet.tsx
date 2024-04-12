import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {forwardRef, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';

export type Ref = BottomSheetModal;
const LanguageBottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['25%'], []);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsVisible(false);
    // You can perform any action based on the selected language here
  };

  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
      <View>
        <Text>THis is bottom sheet</Text>

        <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedLanguage === 'English' && styles.selectedRadioButton,
                ]}
                onPress={() => handleLanguageChange('English')}
              >
                <Text style={styles.radioText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedLanguage === 'Tamil' && styles.selectedRadioButton,
                ]}
                onPress={() => handleLanguageChange('Tamil')}
              >
                <Text style={styles.radioText}>Tamil</Text>
              </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      padding: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    bottomSheet: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    radioButton: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    selectedRadioButton: {
      backgroundColor: '#e0e0e0',
    },
    radioText: {
      fontSize: 16,
    },
  });

  export default LanguageBottomSheet;
