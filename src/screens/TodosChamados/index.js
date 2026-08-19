import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

const mock = [
  { id: '#007', title: 'to calvo', location: 'Bloco Administrativo', category: 'Outros', priority: 'Crítica', status: 'Aberto', date: '03/08/2026' },
  { id: '#006', title: 'Senha do sistema acadêmico bloqueada', location: 'Bloco Administrativo — Secretaria', category: 'Acesso e senha', priority: 'Média', status: 'Aberto', date: '01/08/2026' },
  { id: '#003', title: 'Sem acesso à rede no setor', location: 'Bloco Administrativo — Secretaria', category: 'Rede e conectividade', priority: 'Crítica', status: 'Em andamento', date: '30/07/2026' },
  { id: '#002', title: 'Mouse da biblioteca sem funcionar', location: 'Biblioteca — Balcão de atendimento', category: 'Hardware', priority: 'Baixa', status: 'Em andamento', date: '29/07/2026' },
  { id: '#001', title: 'Computador da secretaria não liga', location: 'Bloco Administrativo — Secretaria', category: 'Hardware', priority: 'Alta', status: 'Aberto', date: '28/07/2026' },
  { id: '#004', title: 'Projetor não reconhece cabo HDMI', location: 'Bloco A — Laboratório 03', category: 'Hardware', priority: 'Média', status: 'Concluído', date: '20/07/2026' },
  { id: '#005', title: 'Impressora fica offline após reiniciar', location: 'Bloco C — Sala 204', category: 'Impressora', priority: 'Baixa', status: 'Concluído', date: '12/07/2026' },
];

export default function TodosChamados({ navigation }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos os status');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="menu" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Meus Chamados</Text>
        <TouchableOpacity style={styles.avatarPlaceholder} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.avatarInitial}>A</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.newButton} onPress={() => navigation.navigate('NovoChamado')}>
        <MaterialIcons name="add" size={18} color="#fff" />
        <Text style={styles.newButtonText}>Novo chamado</Text>
      </TouchableOpacity>

      <View style={styles.filterCard}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por número, titulo, local ou descrição"
          value={query}
          onChangeText={setQuery}
        />

        {/* filtros removidos */}
      </View>

      {mock.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).map(item => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardId}>{item.id}</Text>
            <View style={[styles.statusPill, item.status === 'Aberto' ? styles.statusOpen : item.status === 'Em andamento' ? styles.statusProgress : styles.statusDone]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardMeta}>{item.location}</Text>

          <View style={styles.cardFooterRow}>
            <View style={[styles.priorityPill, item.priority === 'Crítica' ? styles.critica : item.priority === 'Alta' ? styles.alta : item.priority === 'Baixa' ? styles.baixa : styles.media]}>
              <Text style={styles.priorityText}>{item.priority}</Text>
            </View>
            <Text style={styles.cardDate}>{item.date}</Text>
          </View>

          <TouchableOpacity style={styles.btnDet} onPress={() => navigation.navigate('ChamadoDetalhes', { item })}>
            <MaterialIcons name="remove-red-eye" size={16} color="#111827" />
            <Text style={styles.txtBtnDet}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
