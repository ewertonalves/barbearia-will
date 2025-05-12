import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BillingContext } from '../_layout';

interface Appointment {
  id:           string;
  clientName:   string;
  service:      string;
  value:        number;
  professional: string;
  time:         string;
  completed:    boolean;
  blocked?:     boolean;
}

export default function HomeScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'João Silva',
      service: 'Corte de Cabelo',
      value: 30,
      professional: 'Willian',
      time: '10:00',
      completed: false,
    },
    {
      id: '2',
      clientName: 'Maria Souza',
      service: 'Barba',
      value: 20,
      professional: 'Abner',
      time: '11:00',
      completed: false,
    },
    {
      id: '3',
      clientName: 'Carlos Lima',
      service: 'Corte + Barba',
      value: 45,
      professional: 'Abner',
      time: '12:00',
      completed: false,
    },
  ]);

  const { addService } = useContext(BillingContext);

  const handleComplete = (id: string) => {
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
      setAppointments(appointments.map(a => a.id === id ? { ...a, completed: true } : a));
      addService(appointment.service, appointment.value, new Date().toISOString());
    }
  };

  const handleCancel = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const handleBlock = (id: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, blocked: !a.blocked } : a));
  };

  return (
    <View style = {styles.container}>
      <Text style = {styles.header}>AGENDAMENTOS DO DIA</Text>
      <ScrollView style = {styles.list}>
        {appointments.map(appointment => (
          <View key = {appointment.id} style={[styles.card, appointment.completed && styles.completed, appointment.blocked && styles.blocked]}>
            <View style = {styles.info}>
              <Text style = {styles.client}>{appointment.clientName}</Text>
              <Text style = {styles.detail}>{appointment.service} - {appointment.time}</Text>
              <Text style = {styles.detail}>Profissional: {appointment.professional}</Text>
              <Text style = {styles.detail}>Valor: R$ {appointment.value.toFixed(2)}</Text>
            </View>
            <View style = {styles.actions}>
              {!appointment.completed && !appointment.blocked && (
                <TouchableOpacity style = {styles.actionButton} onPress = {() => handleComplete(appointment.id)}>
                  <Text style = {styles.actionText}>Finalizar</Text>
                </TouchableOpacity>
              )}
              {!appointment.completed && !appointment.blocked && (
                <TouchableOpacity style = {[styles.actionButton, { backgroundColor: '#e74c3c' }]} onPress = {() => handleCancel(appointment.id)}>
                  <Text style = {styles.actionText}>Cancelar</Text>
                </TouchableOpacity>
              )}
              {!appointment.completed && (
                <TouchableOpacity style = {[styles.actionButton, { backgroundColor: '#888' }]} onPress = {() => handleBlock(appointment.id)}>
                  <Text style = {styles.actionText}>{appointment.blocked ? 'Desbloquear' : 'Bloquear'}</Text>
                </TouchableOpacity>
              )}
              {appointment.completed && <Text style = {styles.completedText}>Atendido</Text>}
              {appointment.blocked && <Text style = {styles.blockedText}>Bloqueado</Text>}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23293A',
    padding: 24,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center'
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: '#31384a',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  completed: {
    opacity: 0.5,
  },
  blocked: {
    borderColor: '#e74c3c',
    borderWidth: 2,
  },
  info: {
    marginBottom: 10
  },
  client: {
    color: '#10ace7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    color: '#A0A4B8',
    fontSize: 15,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#10ace7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    marginTop: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 15,
  },
  completedText: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
  blockedText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
});
