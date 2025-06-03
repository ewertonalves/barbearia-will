import React, { useMemo, useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

interface Service {
  id:           string;
  clientName:   string;
  service:      string;
  value:        number;
  professional: string;
  time:         string;
  date:         string; // Formato YYYY-MM-DD
}

// Função para formatar data para YYYY-MM-DD
function formatDateToISO(date: Date): string {
  const year  = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day   = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const WEEKDAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

function formatDateBR(dateStr: string | null) {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Obtém a data de hoje formatada para comparação, usando useMemo para otimização
  const todayISO = useMemo(() => formatDateToISO(new Date()), []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response  = await fetch('http://localhost:8080/webhook/appointments');
        const data      = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year  = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth     = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days: { day: string; date: string | null; isToday?: boolean }[] = [];

    // Preenche os dias vazios no início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: '', date: null });
    }

    // Preenche os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const monthStr  = String(month + 1).padStart(2, '0');
      const dayStr    = String(i).padStart(2, '0');
      const currentDateISO = `${year}-${monthStr}-${dayStr}`;
      days.push({
        day: i.toString(),
        date: currentDateISO,
        isToday: currentDateISO === todayISO, // Verifica se é o dia atual
      });
    }
    return days;
  };

  const handleDayPress = (date: string | null) => {
    if (!date) return;
    const servicesForDay = appointments.filter(s => s.date === date);
    setSelectedServices(servicesForDay);
    setSelectedDay(date);
    setModalVisible(true);
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(selectedDate);
    const monthName = selectedDate.toLocaleString('pt-BR', {
      month: 'long',
      year: 'numeric'
    }).toUpperCase();

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={() => setSelectedDate(new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth() - 1,
              1 // Define para o primeiro dia do mês anterior
            ))}
            style={styles.monthButton}
          >
            <Icon name="chevron-left" type="feather" color="#fff" size={24} />
          </TouchableOpacity>
          
          <Text style={styles.monthText}>{monthName}</Text>
          
          <TouchableOpacity
            onPress={() => setSelectedDate(new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth() + 1,
              1 // Define para o primeiro dia do próximo mês
            ))}
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
          {days.map((dayObj, idx) => {
            const hasService = !!dayObj.date && appointments.some(s => s.date === dayObj.date);
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dayCell,
                  dayObj.date && styles.dayCellWithDate,
                  dayObj.isToday && styles.currentDayCell,
                ]}
                onPress={() => handleDayPress(dayObj.date)}
                disabled={!dayObj.date}
                activeOpacity={dayObj.date ? 0.7 : 1}
              >
                {hasService && <View style={styles.orangeDot} />}
                <Text style={[
                  styles.dayText,
                  dayObj.date && styles.dayTextWithDate,
                  dayObj.isToday && styles.currentDayText,
                  !dayObj.date && { color: 'transparent' }
                ]}>
                  {dayObj.day}
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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {renderCalendar()}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Agendamentos - {formatDateBR(selectedDay)}
              </Text>
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
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: `${100 / 7 - 2}%`,
    aspectRatio: 1,
    marginHorizontal: '1%',
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCellWithDate: {
    backgroundColor: '#31384A',
    borderRadius: 8
  },
  currentDayCell: {
    backgroundColor: '#FFA726',
    borderRadius: 8,
  },
  dayText: {
    color: '#A0A4B8',
    fontSize: 14
  },
  dayTextWithDate: {
    color: '#fff'
  },
  currentDayText: { 
    color: '#000',
    fontWeight: 'bold',
  },
  orangeDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA726', // Mantido o ponto laranja para serviços
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