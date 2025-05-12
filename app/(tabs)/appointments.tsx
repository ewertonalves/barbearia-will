import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

interface Service {
  id: string;
  clientName: string;
  service: string;
  value: number;
  professional: string;
  time: string;
  date: string; // Formato YYYY-MM-DD
}

// Seus dados de SERVICES permanecem os mesmos
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
  // Adicionando serviços para a data atual (Maio de 2025) para teste
  {
    id: '29',
    clientName: 'Cliente Teste Dia Atual',
    service: 'Teste Serviço',
    value: 10,
    professional: 'Tester',
    time: '09:00',
    date: '2025-05-12', // Data atual (quando esta resposta foi gerada)
  },
  {
    id: '30',
    clientName: 'Outro Cliente Teste',
    service: 'Outro Teste',
    value: 15,
    professional: 'Tester',
    time: '10:00',
    date: '2025-05-13',
  }
];


const WEEKDAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

// Função para formatar data para YYYY-MM-DD
function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateBR(dateStr: string | null) {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

export default function AppointmentsScreen() {
  // selectedDate já é inicializado com a data atual, o que é correto.
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Obtém a data de hoje formatada para comparação, usando useMemo para otimização
  const todayISO = useMemo(() => formatDateToISO(new Date()), []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // getDay() retorna 0 para Domingo, 1 para Segunda, ..., 6 para Sábado
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days: { day: string; date: string | null; isToday?: boolean }[] = [];

    // Preenche os dias vazios no início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: '', date: null });
    }

    // Preenche os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(i).padStart(2, '0');
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
    const servicesForDay = SERVICES.filter(s => s.date === date);
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
            const hasService = !!dayObj.date && SERVICES.some(s => s.date === dayObj.date);
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dayCell,
                  dayObj.date && styles.dayCellWithDate,
                  dayObj.isToday && styles.currentDayCell, // Estilo para o dia atual
                  // Removido hasService && styles.dayCellWithService para não sobrescrever o currentDayCell
                  // O ponto laranja já indica serviço
                ]}
                onPress={() => handleDayPress(dayObj.date)}
                disabled={!dayObj.date}
                activeOpacity={dayObj.date ? 0.7 : 1}
              >
                {hasService && <View style={styles.orangeDot} />}
                <Text style={[
                  styles.dayText,
                  dayObj.date && styles.dayTextWithDate,
                  dayObj.isToday && styles.currentDayText, // Estilo para o texto do dia atual
                  // hasService && styles.dayTextWithService, // Pode ser combinado ou removido
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
    width: '14.28%', // Garante 7 colunas
    textAlign: 'center'
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Para alinhar corretamente as células
  },
  dayCell: {
    width: `${100 / 7 - 2}%`, // Ajuste para caber 7 colunas com pequena margem
    aspectRatio: 1,
    marginHorizontal: '1%', // Pequena margem horizontal
    marginVertical: 4, // Pequena margem vertical
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCellWithDate: {
    backgroundColor: '#31384A',
    borderRadius: 8
  },
  currentDayCell: { // Novo estilo para o dia atual
    backgroundColor: '#FFA726', // Uma cor de destaque, por exemplo laranja
    borderRadius: 8,
  },
  // dayCellWithService: { // Pode ser removido se o ponto laranja for suficiente
  //   backgroundColor: '#31384A' 
  // },
  dayText: {
    color: '#A0A4B8',
    fontSize: 14
  },
  dayTextWithDate: {
    color: '#fff'
  },
  currentDayText: { // Novo estilo para o texto do dia atual
    color: '#000', // Cor de texto que contrasta com o fundo do dia atual
    fontWeight: 'bold',
  },
  // dayTextWithService: { // Pode ser combinado ou ajustado
  //   fontWeight: 'bold' 
  // },
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