/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '@Components/Home/Home';
import Users from '@Components/User/User';
import AppImages from '@Theme/AppImages';
import { AppContext } from '@AppContext';
import ThemeColor from '@Theme/Colors';
import { AssetImage } from '@CommonComponent';

const Tab = createBottomTabNavigator();

enum tabs {
  HomeTab = 'Home',
  SearchTab = 'Search',
  UsersTab = 'Users',
  SettingsTab = 'Settings',
}

const TABS = [
  {
    title: tabs.HomeTab,
    icon: AppImages.home,
    screen: Home,
    name: 'home',
  },
  {
    title: tabs.UsersTab,
    icon: AppImages.user,
    screen: Users,
    name: 'user',
  },
];

const AppTab = () => {
  const { appTheme } = useContext(AppContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: ThemeColor.gray,
        tabBarStyle: {
          backgroundColor: appTheme.tab,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: appTheme.background,
      }}>
      {TABS.map(tab => {
        return (
          <Tab.Screen
            key={tab.title}
            name={tab.name}
            component={tab.screen}
            options={(): BottomTabNavigationOptions => {
              return {
                headerShown: false,
                tabBarIcon: ({ focused, size }) => (
                  <AssetImage
                    resizeMode="contain"
                    source={tab.icon}
                    imageStyle={{
                      height: size,
                      width: size,
                      tintColor:
                        (focused && appTheme.themeColor) || appTheme.lightText,
                    }}
                  />
                ),
              };
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { AppTab, tabs };
