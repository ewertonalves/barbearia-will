import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WorkSchedule {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
  isDayOff: boolean;
  isPartialDay: boolean;
}

export default function ScheduleScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isDayOff, setIsDayOff] = useState(false);
  const [isPartialDay, setIsPartialDay] = useState(false);
  const [schedules, setSchedules] = useState<{ [key: string]: WorkSchedule }>({});

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/schedule');
      const data = await response.json();
      const formattedSchedules = data.reduce((acc: any, schedule: WorkSchedule) => {
        acc[schedule.date] = schedule;
        return acc;
      }, {});
      setSchedules(formattedSchedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
    const existingSchedule = schedules[date.dateString];
    if (existingSchedule) {
      setStartTime(new Date(`2000-01-01T${existingSchedule.startTime}`));
      setEndTime(new Date(`2000-01-01T${existingSchedule.endTime}`));
      setIsDayOff(existingSchedule.isDayOff);
      setIsPartialDay(existingSchedule.isPartialDay);
    } else {
      setStartTime(new Date());
      setEndTime(new Date());
      setIsDayOff(false);
      setIsPartialDay(false);
    }
  };

  const handleSave = async () => {
    if (!selectedDate) return;

    const schedule: WorkSchedule = {
      date: selectedDate,
      startTime: startTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      isDayOff,
      isPartialDay,
    };

    try {
      const url = 'http://localhost:8080/api/schedule';
      const method = schedules[selectedDate] ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule),
      });

      if (response.ok) {
        await fetchSchedules();
        alert('Schedule saved successfully!');
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Error saving schedule');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Work Schedule</Text>
      </View>

      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          ...Object.keys(schedules).reduce((acc, date) => {
            acc[date] = {
              marked: true,
              dotColor: schedules[date].isDayOff ? 'red' : 'green',
            };
            return acc;
          }, {} as any),
        }}
      />

      {selectedDate && (
        <View style={styles.scheduleForm}>
          <Text style={styles.dateText}>
            {new Date(selectedDate).toLocaleDateString()}
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.option, isDayOff && styles.selectedOption]}
              onPress={() => {
                setIsDayOff(!isDayOff);
                if (!isDayOff) setIsPartialDay(false);
              }}
            >
              <Text style={styles.optionText}>Day Off</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.option, isPartialDay && styles.selectedOption]}
              onPress={() => {
                setIsPartialDay(!isPartialDay);
                if (!isPartialDay) setIsDayOff(false);
              }}
            >
              <Text style={styles.optionText}>Partial Day</Text>
            </TouchableOpacity>
          </View>

          {!isDayOff && (
            <View style={styles.timeContainer}>
              <TouchableOpacity
                style={styles.timePicker}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text>Start Time: {startTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.timePicker}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Text>End Time: {endTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Schedule</Text>
          </TouchableOpacity>
        </View>
      )}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scheduleForm: {
    padding: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  option: {
    flex: 1,
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    color: '#000',
  },
  timeContainer: {
    marginBottom: 16,
  },
  timePicker: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 