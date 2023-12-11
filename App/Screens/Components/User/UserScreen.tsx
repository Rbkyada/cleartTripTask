import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomText, Layout, NetworkImage } from '@CommonComponent';
import { SettingRow } from '@SubComponents';
import { AppContext } from '@AppContext';
import { onLogout } from '@Utils/Helper';

const UserScreen = () => {
  const navigation = useNavigation();

  const { appTheme, translations } = useContext(AppContext);

  const logout = () => {
    Alert.alert(
      '',
      'Do you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => onLogout(navigation),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Layout>
      <NetworkImage source="https://iili.io/H1D3eDX.jpg" />
      <CustomText>UserScreen</CustomText>

      <SettingRow
        title={translations.LOG_OUT}
        onPress={logout}
        value={'light'}
        textStyle={{ color: appTheme.red }}
      />
    </Layout>
  );
};

export { UserScreen };
