import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomText, Layout, NetworkImage } from '@CommonComponent';
import { SettingRow } from '@SubComponents';
import { AppContext } from '@AppContext';
import { onLogout } from '@Utils/Helper';

const styles = StyleSheet.create({
  imgStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
  },
  title: {
    paddingVertical: 30,
    alignSelf: 'center',
  },
});

const UserScreen = () => {
  const navigation = useNavigation();

  const { appTheme, translations } = useContext(AppContext);

  const { imgStyle, title } = styles;

  const logout = () => {
    Alert.alert(
      '',
      `${translations.LOGOUT_MESSAGE}`,
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
      <NetworkImage
        resizeMode="cover"
        source="https://iili.io/H1D3eDX.jpg"
        imageStyle={imgStyle}
      />
      <CustomText xxlarge style={title}>
        {translations.WELCOME}
      </CustomText>

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
