import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BillingContext, UserContext } from '../_layout';

const FILTERS = [
  { key: 'daily',   label: 'Diário' },
  { key: 'weekly',  label: 'Semanal' },
  { key: 'monthly', label: 'Mensal' },
];

export default function ReportsScreen() {
  const [selected, setSelected] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const { billingData } = useContext(BillingContext);
  const { userType } = useContext(UserContext);
  const report = billingData[selected];

  useEffect(() => {
    // Redireciona para a tela inicial se não for o proprietário
    if (userType !== 'owner') {
      router.replace('/(tabs)');
    }
  }, [userType]);

  // Se não for o proprietário, não renderiza nada
  if (userType !== 'owner') {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RELATÓRIO DE FATURAMENTO</Text>
      <View style={styles.filtersRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterBtn, selected === f.key && styles.filterBtnActive]}
            onPress={() => setSelected(f.key as any)}
          >
            <Text style={[styles.filterText, selected === f.key && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.valueBox}>
        <Text style={styles.valueLabel}>Valor alcançado</Text>
        <Text style={styles.value}>R$ {report.value.toFixed(2)}</Text>
      </View>
      <View style={styles.countBox}>
        <Text style={styles.countLabel}>Serviços realizados</Text>
        <Text style={styles.count}>{report.services.length}</Text>
      </View>
      <Text style={styles.listTitle}>Lista de serviços realizados</Text>
      <FlatList
        data={report.services}
        keyExtractor={(_, idx) => String(idx)}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.clientRow}>
            <Text style={styles.clientService}>{item.service}</Text>
            <Text style={styles.clientValue}>R$ {item.value.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23293A',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center'
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    gap: 12,
  },
  filterBtn: {
    backgroundColor: '#262835',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginHorizontal: 4,
  },
  filterBtnActive: {
    backgroundColor: '#10ace7',
  },
  filterText: {
    color: '#A0A4B8',
    fontWeight: 'bold',
    fontSize: 15,
  },
  filterTextActive: {
    color: '#fff',
  },
  valueBox: {
    backgroundColor: '#262835',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
  },
  valueLabel: {
    color: '#A0A4B8',
    fontSize: 15,
    marginBottom: 4,
  },
  value: {
    color: '#10ace7',
    fontSize: 28,
    fontWeight: 'bold',
  },
  countBox: {
    backgroundColor: '#262835',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 18,
  },
  countLabel: {
    color: '#A0A4B8',
    fontSize: 15,
    marginBottom: 4,
  },
  count: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listTitle: {
    color: '#10ace7',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: -20,
  },
  list: {
    backgroundColor: '#262835',
    borderRadius: 14,
    padding: 8,
  },
  clientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#31384A',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  clientService: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  clientValue: {
    color: '#10ace7',
    fontSize: 15,
    fontWeight: 'bold',
  },
}); 