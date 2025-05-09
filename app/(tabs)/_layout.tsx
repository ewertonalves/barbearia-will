import { Tabs } from 'expo-router';
import React from 'react';
import { Icon } from 'react-native-elements';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions = {{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:  '#262835',
          borderTopColor:   '#10ace7',
        },
        tabBarActiveTintColor:    '#10ace7',
        tabBarInactiveTintColor:  '#fff',
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 0
        },
      }}
    >
      <Tabs.Screen
        name    = "index"
        options = {{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Icon name="home" type="feather" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name    = "appointments"
        options = {{
          title: 'Agenda',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" type="feather" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name    = "reports"
        options = {{
          title: 'Relatórios',
          tabBarIcon: ({ color }) => (
            <Icon name="bar-chart" type="feather" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
