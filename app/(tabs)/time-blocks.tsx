import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BlockedTime {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  reason?: string;
}

export default function TimeBlocksScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [reason, setReason] = useState('');
  const [manualTimeInput, setManualTimeInput] = useState({
    start: '',
    end: ''
  });

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
    setShowTimeModal(true);
  };

  const handleSaveBlock = () => {
    if (!selectedDate) return;

    const newBlock: BlockedTime = {
      id: Date.now().toString(),
      date: selectedDate,
      startTime: startTime.toLocaleTimeString(),
      endTime: endTime.toLocaleTimeString(),
      reason: reason,
    };

    setBlockedTimes([...blockedTimes, newBlock]);
    setSelectedDate('');
    setStartTime(new Date());
    setEndTime(new Date());
    setReason('');
    setShowTimeModal(false);
  };

  const handleRemoveBlock = (id: string) => {
    setBlockedTimes(blockedTimes.filter(block => block.id !== id));
  };

  const handleManualTimeSave = () => {
    if (!selectedDate || !manualTimeInput.start || !manualTimeInput.end) return;

    const newBlock: BlockedTime = {
      id: Date.now().toString(),
      date: selectedDate,
      startTime: manualTimeInput.start,
      endTime: manualTimeInput.end,
      reason: reason,
    };

    setBlockedTimes([...blockedTimes, newBlock]);
    setSelectedDate('');
    setManualTimeInput({ start: '', end: '' });
    setReason('');
    setShowTimeModal(false);
  };

  const markedDates = blockedTimes.reduce((acc, block) => {
    acc[block.date] = {
      marked: true,
      dotColor: '#e74c3c',
    };
    return acc;
  }, {} as any);

  const formatDate = (date: string) => {
    return format(parseISO(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>BLOQUEIO DE HORÁRIOS</Text>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={markedDates}
          theme={{
            backgroundColor: '#23293A',
            calendarBackground: '#23293A',
            textSectionTitleColor: '#fff',
            selectedDayBackgroundColor: '#10ace7',
            selectedDayTextColor: '#fff',
            todayTextColor: '#10ace7',
            dayTextColor: '#fff',
            textDisabledColor: '#444',
            monthTextColor: '#fff',
            arrowColor: '#10ace7',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          monthFormat="MMMM yyyy"
          firstDay={0}
          enableSwipeMonths={true}
          hideExtraDays={false}
          disableAllTouchEventsForDisabledDays={true}
        />
        <View style={styles.blockedList}>
          <Text style={styles.listTitle}>Horários Bloqueados</Text>
          {blockedTimes.map(block => (
            <View key={block.id} style={styles.blockedItem}>
              <View style={styles.blockedInfo}>
                <Text style={styles.blockedDate}>
                  {formatDate(block.date)}
                </Text>
                <Text style={styles.blockedTime}>
                  {block.startTime} - {block.endTime}
                </Text>
                {block.reason && (
                  <Text style={styles.blockedReason}>{block.reason}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveBlock(block.id)}
              >
                <Icon name="trash-2" type="feather" color="#e74c3c" size={20} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showTimeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTimeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Bloquear Horário - {selectedDate ? formatDate(selectedDate) : ''}
              </Text>
              <TouchableOpacity onPress={() => setShowTimeModal(false)}>
                <Icon name="x" type="feather" color="#fff" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.timeSelectionContainer}>
              <Text style={styles.sectionTitle}>Selecione o horário</Text>
              
              <View style={styles.timeInputContainer}>
                <Text style={styles.inputLabel}>Horário de Início</Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="00:00"
                  placeholderTextColor="#666"
                  value={manualTimeInput.start}
                  onChangeText={(text) => setManualTimeInput(prev => ({ ...prev, start: text }))}
                  keyboardType="numbers-and-punctuation"
                />
              </View>

              <View style={styles.timeInputContainer}>
                <Text style={styles.inputLabel}>Horário de Fim</Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="00:00"
                  placeholderTextColor="#666"
                  value={manualTimeInput.end}
                  onChangeText={(text) => setManualTimeInput(prev => ({ ...prev, end: text }))}
                  keyboardType="numbers-and-punctuation"
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleManualTimeSave}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {(showStartTimePicker || showEndTimePicker) && (
        <DateTimePicker
          value={showStartTimePicker ? startTime : endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              if (showStartTimePicker) {
                setStartTime(selectedDate);
              } else {
                setEndTime(selectedDate);
              }
            }
            setShowStartTimePicker(false);
            setShowEndTimePicker(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23293A',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    paddingTop: 24,
  },
  blockedList: {
    marginTop: 24,
    marginHorizontal: 24,
    paddingBottom: 24,
  },
  listTitle: {
    color: '#10ace7',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  blockedItem: {
    backgroundColor: '#262835',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockedInfo: {
    flex: 1,
  },
  blockedDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blockedTime: {
    color: '#A0A4B8',
    fontSize: 14,
    marginTop: 4,
  },
  blockedReason: {
    color: '#A0A4B8',
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#262835',
    borderRadius: 14,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#31384A',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeSelectionContainer: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  timeInputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#A0A4B8',
    fontSize: 14,
    marginBottom: 8,
  },
  timeInput: {
    backgroundColor: '#31384A',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#10ace7',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 