import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const REPORTS = {
  daily: {
    value: 350,
    clients: [
      { name: 'João Silva',   service: 'Corte de Cabelo' },
      { name: 'Maria Souza',  service: 'Barba' },
      { name: 'Carlos Lima',  service: 'Corte + Barba' },
    ],
  },
  weekly: {
    value: 1800,
    clients: [
      { name: 'João Silva',     service: 'Corte de Cabelo' },
      { name: 'Maria Souza',    service: 'Barba' },
      { name: 'Carlos Lima',    service: 'Corte + Barba' },
      { name: 'Ana Paula',      service: 'Corte Feminino' },
      { name: 'Pedro Santos',   service: 'Barba' },
      { name: 'Lucas Rocha',    service: 'Corte de Cabelo' },
      { name: 'Fernanda Dias',  service: 'Corte + Barba' },
      { name: 'Rafael Costa',   service: 'Barba' },
      { name: 'Juliana Alves',  service: 'Corte Feminino' },
      { name: 'Bruno Martins',  service: 'Corte de Cabelo' },
    ],
  },
  monthly: {
    value: 7200,
    clients: [
      { name: 'João Silva',     service: 'Corte de Cabelo' },
      { name: 'Maria Souza',    service: 'Barba' },
      { name: 'Carlos Lima',    service: 'Corte + Barba' },
      { name: 'Ana Paula',      service: 'Corte Feminino' },
      { name: 'Pedro Santos',   service: 'Barba' },
      { name: 'Lucas Rocha',    service: 'Corte de Cabelo' },
      { name: 'Fernanda Dias',  service: 'Corte + Barba' },
      { name: 'Rafael Costa',   service: 'Barba' },
      { name: 'Juliana Alves',  service: 'Corte Feminino' },
      { name: 'Bruno Martins',  service: 'Corte de Cabelo' },
      { name: 'Amanda Souza',   service: 'Corte de Cabelo' },
      { name: 'Tiago Lima',     service: 'Barba' },
      { name: 'Patrícia Gomes', service: 'Corte + Barba' },
      { name: 'Eduardo Silva',  service: 'Corte de Cabelo' },
      { name: 'Marina Rocha',   service: 'Corte Feminino' },
      { name: 'Fábio Dias',     service: 'Barba' },
      { name: 'Gabriela Costa', service: 'Corte de Cabelo' },
      { name: 'Rodrigo Alves',  service: 'Corte + Barba' },
      { name: 'Beatriz Martins', service: 'Corte Feminino' },
      { name: 'Vinícius Souza', service: 'Barba' },
      { name: 'Letícia Lima',   service: 'Corte de Cabelo' },
      { name: 'André Gomes',    service: 'Corte + Barba' },
      { name: 'Camila Silva',   service: 'Corte Feminino' },
      { name: 'Henrique Rocha', service: 'Barba' },
      { name: 'Larissa Dias',   service: 'Corte de Cabelo' },
      { name: 'Felipe Costa',   service: 'Corte + Barba' },
      { name: 'Priscila Alves', service: 'Corte Feminino' },
      { name: 'Otávio Martins', service: 'Corte de Cabelo' },
      { name: 'Sabrina Souza',  service: 'Barba' },
      { name: 'Gustavo Lima',   service: 'Corte + Barba' },
    ],
  },
};

const FILTERS = [
  { key: 'daily',   label: 'Diário' },
  { key: 'weekly',  label: 'Semanal' },
  { key: 'monthly', label: 'Mensal' },
];

export default function ReportsScreen() {
  const [selected, setSelected] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const report = REPORTS[selected];

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
        <Text style={styles.countLabel}>Clientes atendidos</Text>
        <Text style={styles.count}>{report.clients.length}</Text>
      </View>
      <Text style={styles.listTitle}>Lista de clientes atendidos</Text>
      <FlatList
        data={report.clients}
        keyExtractor={(_, idx) => String(idx)}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.clientRow}>
            <Text style={styles.clientName}>{item.name}</Text>
            <Text style={styles.clientService}>{item.service}</Text>
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
    marginTop: 8,
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
  clientName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  clientService: {
    color: '#A0A4B8',
    fontSize: 15,
    fontStyle: 'italic',
  },
}); 