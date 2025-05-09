import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  value: number;
  professional: string;
  time: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'João Silva',
      service: 'Corte de Cabelo',
      value: 30,
      professional: 'Abner',
      time: '10:00',
      completed: false,
    },
    // Add more sample appointments here
  ]);

  const totalAppointments     = appointments.length;
  const completedAppointments = appointments.filter(a => a.completed).length;
  const dailyRevenue          = appointments
    .filter(a => a.completed)
    .reduce((sum, a) => sum + a.value, 0);

  const handleCompleteAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, completed: true } : apt
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resumo do Dia</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Agendamentos</Text>
          <Text style={styles.summaryValue}>{totalAppointments}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Atendidos</Text>
          <Text style={styles.summaryValue}>{completedAppointments}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Faturamento</Text>
          <Text style={styles.summaryValue}>R$ {dailyRevenue.toFixed(2)}</Text>
        </View>
      </View>

      <ScrollView style={styles.appointmentsList}>
        {appointments.map(appointment => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentInfo}>
              <Text style={styles.clientName}>{appointment.clientName}</Text>
              <Text style={styles.serviceInfo}>{appointment.service}</Text>
              <Text style={styles.timeInfo}>{appointment.time} - {appointment.professional}</Text>
            </View>
            {!appointment.completed && (
              <TouchableOpacity 
                style={styles.completeButton}
                onPress={() => handleCompleteAppointment(appointment.id)}
              >
                <Text style={styles.completeButtonText}>Finalizar</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262835',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#10ace7',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    width: '30%',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262835',
  },
  appointmentsList: {
    flex: 1,
    padding: 20,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262835',
  },
  serviceInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timeInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  completeButton: {
    backgroundColor: '#10ace7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  completeButtonText: {
    color: '#fff'
  },
}); 