import { Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { UserContext } from '../_layout';

export default function TabsLayout() {
  const { username } = useContext(UserContext);

  return (
    <>
      <View style={styles.greetingContainer}>
        <Image
          source={require('../../assets/images/will-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.greetingText}>{username || ''}</Text>
      </View>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#262835',
            borderTopColor: '#10ace7',
          },
          tabBarActiveTintColor: '#10ace7',
          tabBarInactiveTintColor: '#fff',
          tabBarLabelStyle: {
            fontSize: 10,
            marginTop: 0,
          },
          // Força as abas a ocuparem o espaço restante de forma uniforme
          tabBarItemStyle: {
            flexGrow: 1,
          },
        }}
      >
        {/* Aba “Início” */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color }) => (
              <Icon name="home" type="feather" color={color} size={24} />
            ),
          }}
        />

        {/* Aba “Agenda” */}
        <Tabs.Screen
          name="appointments"
          options={{
            title: 'Agenda',
            tabBarIcon: ({ color }) => (
              <Icon name="calendar" type="feather" color={color} size={24} />
            ),
          }}
        />

        {/* Aba “Bloqueios” */}
        <Tabs.Screen
          name="time-blocks"
          options={{
            title: 'Bloqueios',
            tabBarIcon: ({ color }) => (
              <Icon name="clock" type="feather" color={color} size={24} />
            ),
          }}
        />

        {/* Aba “Relatórios” (aparece só para Willian; para outros, display: 'none') */}
        <Tabs.Screen
          name="reports"
          options={{
            title: 'Relatórios',
            tabBarIcon: ({ color }) => (
              <Icon name="bar-chart" type="feather" color={color} size={24} />
            ),

            // Se o username NÃO for Willian, faz display: 'none' para remover o espaço
            tabBarItemStyle: {
              display: username === 'Willian' ? 'flex' : 'none',
            },
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingLeft: 24,
    paddingBottom: 8,
    backgroundColor: '#23293A',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 16,
  },
  greetingText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
