import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState } from 'react';

// Contexto para usuário logado
export const UserContext = createContext({ 
  username: '', 
  setUsername: (name: string) => {},
  userType: '' as 'owner' | 'employee' | '',
  setUserType: (type: 'owner' | 'employee') => {}
});

interface BillingData {
  daily: {
    value: number;
    services: Array<{
      service: string;
      value: number;
      date: string;
    }>;
  };
  weekly: {
    value: number;
    services: Array<{
      service: string;
      value: number;
      date: string;
    }>;
  };
  monthly: {
    value: number;
    services: Array<{
      service: string;
      value: number;
      date: string;
    }>;
  };
}

export const BillingContext = createContext<{
  billingData: BillingData;
  addService: (service: string, value: number, date: string) => void;
}>({
  billingData: {
    daily: { value: 0, services: [] },
    weekly: { value: 0, services: [] },
    monthly: { value: 0, services: [] },
  },
  addService: () => {},
});

export default function RootLayout() {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState<'owner' | 'employee' | ''>('');
  const [billingData, setBillingData] = useState<BillingData>({
    daily: { value: 0, services: [] },
    weekly: { value: 0, services: [] },
    monthly: { value: 0, services: [] },
  });

  const addService = (service: string, value: number, date: string) => {
    const serviceDate = new Date(date);
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    setBillingData(prev => {
      const newService = { service, value, date };
      const newDaily = {
        value: serviceDate.toDateString() === today.toDateString() 
          ? prev.daily.value + value 
          : prev.daily.value,
        services: serviceDate.toDateString() === today.toDateString()
          ? [...prev.daily.services, newService]
          : prev.daily.services,
      };

      const newWeekly = {
        value: serviceDate >= startOfWeek && serviceDate <= today
          ? prev.weekly.value + value
          : prev.weekly.value,
        services: serviceDate >= startOfWeek && serviceDate <= today
          ? [...prev.weekly.services, newService]
          : prev.weekly.services,
      };

      const newMonthly = {
        value: serviceDate >= startOfMonth && serviceDate <= today
          ? prev.monthly.value + value
          : prev.monthly.value,
        services: serviceDate >= startOfMonth && serviceDate <= today
          ? [...prev.monthly.services, newService]
          : prev.monthly.services,
      };

      return {
        daily: newDaily,
        weekly: newWeekly,
        monthly: newMonthly,
      };
    });
  };

  return (
    <UserContext.Provider value={{ username, setUsername, userType, setUserType }}>
      <BillingContext.Provider value={{ billingData, addService }}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false 
            }} 
          />
        </Stack>
        <StatusBar style="light" />
      </BillingContext.Provider>
    </UserContext.Provider>
  );
}
