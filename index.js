import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import FoodApp from './FoodApp';
import './src/localization/i18n.config';

AppRegistry.registerComponent(appName, () => FoodApp);
