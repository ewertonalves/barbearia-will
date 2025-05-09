import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

interface Service {
  id: string;
  clientName: string;
  service: string;
  value: number;
  professional: string;
  time: string;
  date: string;
}

const SERVICES: Service[] = [
  {
    id: '1',
    clientName: 'João Silva',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Willian',
    time: '10:00',
    date: '2024-03-15',
  },
  {
    id: '2',
    clientName: 'Maria Souza',
    service: 'Barba',
    value: 20,
    professional: 'Abner',
    time: '11:00',
    date: '2024-03-15',
  },
  {
    id: '3',
    clientName: 'Carlos Lima',
    service: 'Corte + Barba',
    value: 45,
    professional: 'Abner',
    time: '12:00',
    date: '2024-03-16',
  },
  {
    id: '4',
    clientName: 'Ana Paula',
    service: 'Corte Feminino',
    value: 50,
    professional: 'Willian',
    time: '14:00',
    date: '2024-03-16',
  },
  {
    id: '5',
    clientName: 'Pedro Santos',
    service: 'Barba',
    value: 20,
    professional: 'Abner',
    time: '15:00',
    date: '2024-03-16',
  },
  {
    id: '6',
    clientName: 'Lucas Rocha',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Willian',
    time: '16:00',
    date: '2024-03-18',
  },
  {
    id: '7',
    clientName: 'Fernanda Dias',
    service: 'Corte + Barba',
    value: 45,
    professional: 'Abner',
    time: '17:00',
    date: '2024-03-18',
  },
  {
    id: '8',
    clientName: 'Rafael Costa',
    service: 'Barba',
    value: 20,
    professional: 'Willian',
    time: '18:00',
    date: '2024-03-18',
  },
  {
    id: '9',
    clientName: 'Juliana Alves',
    service: 'Corte Feminino',
    value: 50,
    professional: 'Abner',
    time: '10:00',
    date: '2024-03-20',
  },
  {
    id: '10',
    clientName: 'Bruno Martins',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Willian',
    time: '11:00',
    date: '2024-03-20',
  },
  {
    id: '11',
    clientName: 'Amanda Souza',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Abner',
    time: '14:00',
    date: '2024-03-22',
  },
  {
    id: '12',
    clientName: 'Tiago Lima',
    service: 'Barba',
    value: 20,
    professional: 'Willian',
    time: '15:00',
    date: '2024-03-22',
  },
  {
    id: '13',
    clientName: 'Patrícia Gomes',
    service: 'Corte + Barba',
    value: 45,
    professional: 'Abner',
    time: '16:00',
    date: '2024-03-22',
  },
  {
    id: '14',
    clientName: 'Eduardo Silva',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Willian',
    time: '17:00',
    date: '2024-03-25',
  },
  {
    id: '15',
    clientName: 'Marina Rocha',
    service: 'Corte Feminino',
    value: 50,
    professional: 'Abner',
    time: '18:00',
    date: '2024-03-25',
  },
  {
    id: '16',
    clientName: 'Fábio Dias',
    service: 'Barba',
    value: 20,
    professional: 'Willian',
    time: '10:00',
    date: '2024-03-27',
  },
  {
    id: '17',
    clientName: 'Gabriela Costa',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Abner',
    time: '11:00',
    date: '2024-03-27',
  },
  {
    id: '18',
    clientName: 'Rodrigo Alves',
    service: 'Corte + Barba',
    value: 45,
    professional: 'Willian',
    time: '14:00',
    date: '2024-03-27',
  },
  {
    id: '19',
    clientName: 'Beatriz Martins',
    service: 'Corte Feminino',
    value: 50,
    professional: 'Abner',
    time: '15:00',
    date: '2024-03-29',
  },
  {
    id: '20',
    clientName: 'Vinícius Souza',
    service: 'Barba',
    value: 20,
    professional: 'Willian',
    time: '16:00',
    date: '2024-03-29',
  },
  {
    id: '21',
    clientName: 'Letícia Lima',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Abner',
    time: '17:00',
    date: '2024-03-29',
  },
  {
    id: '22',
    clientName: 'André Gomes',
    service: 'Corte + Barba',
    value: 45,
    professional: 'Willian',
    time: '18:00',
    date: '2024-03-29',
  },
  {
    id: '23',
    clientName: 'Exemplo Maio',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Willian',
    time: '10:00',
    date: '2024-05-02',
  },
  {
    id: '24',
    clientName: 'Exemplo Maio 2',
    service: 'Barba',
    value: 20,
    professional: 'Abner',
    time: '15:00',
    date: '2024-05-15',
  },
  {
    id: '25',
    clientName: 'Exemplo Maio 3',
    service: 'Corte + Barba',
    value: 45,
    professional: 'Willian',
    time: '18:00',
    date: '2024-05-28',
  },
  {
    id: '26',
    clientName: 'Exemplo Junho',
    service: 'Corte Feminino',
    value: 50,
    professional: 'Abner',
    time: '11:00',
    date: '2024-06-05',
  },
  {
    id: '27',
    clientName: 'Exemplo Junho 2',
    service: 'Barba',
    value: 20,
    professional: 'Willian',
    time: '16:00',
    date: '2024-06-18',
  },
  {
    id: '28',
    clientName: 'Exemplo Junho 3',
    service: 'Corte de Cabelo',
    value: 30,
    professional: 'Abner',
    time: '17:00',
    date: '2024-06-25',
  }
];

const WEEKDAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

// Função utilitária para formatar data no padrão DD-MM-YYYY
function formatDateBR(dateStr: string | null) {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${dd}`;
}

export default function AppointmentsScreen() {
  const firstDate = SERVICES.length > 0 ? new Date(SERVICES[0].date) : new Date();
  const [selectedDate, setSelectedDate] = useState(new Date(firstDate.getFullYear(), firstDate.getMonth()));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days: { day: string; date: string | null }[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: '', date: null });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(i).padStart(2, '0');
      days.push({ day: i.toString(), date: `${year}-${monthStr}-${dayStr}` });
    }
    return days;
  };

  const handleDayPress = (date: string | null) => {
    if (!date) return;
    const servicesForDay = SERVICES.filter(s => s.date === date);
    setSelectedServices(servicesForDay);
    setSelectedDay(date);
    setModalVisible(true);
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(selectedDate);
    const monthName = selectedDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase();

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
            style={styles.monthButton}
          >
            <Icon name="chevron-left" type="feather" color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.monthText}>{monthName}</Text>
          <TouchableOpacity
            onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
            style={styles.monthButton}
          >
            <Icon name="chevron-right" type="feather" color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.weekdaysContainer}>
          {WEEKDAYS.map(d => (
            <Text key={d} style={styles.weekdayText}>{d}</Text>
          ))}
        </View>

        <View style={styles.daysContainer}>
          {days.map((day, idx) => {
            const hasService = !!day.date && SERVICES.some(s => s.date === day.date);
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dayCell,
                  day.date && styles.dayCellWithDate,
                  hasService && styles.dayCellWithService
                ]}
                onPress={() => handleDayPress(day.date)}
                disabled={!day.date}
                activeOpacity={day.date ? 0.7 : 1}
              >
                {hasService && <View style={styles.orangeDot} />}
                <Text style={[
                  styles.dayText,
                  day.date && styles.dayTextWithDate,
                  hasService && styles.dayTextWithService,
                  !day.date && { color: 'transparent' }
                ]}>
                  {day.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.thanks}>AGENDA</Text>
      {renderCalendar()}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Agendamentos do Dia - {formatDateBR(selectedDay)}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="x" type="feather" color="#fff" size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {selectedServices.length > 0 ? (
                selectedServices.map(s => (
                  <View key={s.id} style={styles.serviceCard}>
                    <Text style={styles.serviceClient}>{s.clientName}</Text>
                    <Text style={styles.serviceDetail}>Serviço: {s.service}</Text>
                    <Text style={styles.serviceDetail}>Horário: {s.time}</Text>
                    <Text style={styles.serviceDetail}>Profissional: {s.professional}</Text>
                    <Text style={styles.serviceDetail}>Valor: R$ {s.value.toFixed(2)}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noServices}>Nenhum agendamento para este dia</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23293A',
    padding: 24,
  },
  thanks: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 2,
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: '#262835',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthButton: { 
    padding: 8 
  },
  monthText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  weekdaysContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  weekdayText: { 
    color: '#A0A4B8', 
    fontSize: 12, 
    width: '14.28%', 
    textAlign: 'center' 
  },
  daysContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  dayCell: { 
    width: '14.28%', 
    aspectRatio: 1, 
    margin: 2, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  dayCellWithDate: { 
    backgroundColor: '#31384A', 
    borderRadius: 8 
  },
  dayCellWithService: { 
    backgroundColor: '#31384A' 
  },
  dayText: { 
    color: '#A0A4B8', 
    fontSize: 14 
  },
  dayTextWithDate: { 
    color: '#fff' 
  },
  dayTextWithService: { 
    fontWeight: 'bold' 
  },
  orangeDot: { 
    position: 'absolute', 
    top: 4, 
    right: 4, 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#FFA726', 
    opacity: 0.85, 
    zIndex: 2 
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContent: { 
    backgroundColor: '#262835', 
    borderRadius: 12, 
    width: '90%', 
    maxHeight: '80%' 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#31384A' 
  },
  modalTitle: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center'
  },
  modalBody: { 
    padding: 16 
  },
  serviceCard: { 
    backgroundColor: '#31384A', 
    borderRadius: 8, 
    padding: 16, 
    marginBottom: 12 
  },
  serviceClient: { 
    color: '#10ace7', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  serviceDetail: { 
    color: '#A0A4B8', 
    fontSize: 14, 
    marginBottom: 4 
  },
  noServices: { 
    color: '#A0A4B8', 
    fontSize: 16, 
    textAlign: 'center', 
    fontStyle: 'italic' 
  },
});
