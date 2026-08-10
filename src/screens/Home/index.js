import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

const mockChamados = [
  {
    id: '#001',
    titulo: 'Hardw...',
    descricao: 'Rede e conecti...',
    prioridade: 'Alta',
    status: 'Aberto',
  },
  {
    id: '#002',
    titulo: 'Mouse...',
    descricao: 'Hardware • Bibli...',
    prioridade: 'Média',
    status: 'Aberto',
  },
  {
    id: '#003',
    titulo: 'Sem a...',
    descricao: 'Rede e conecti...',
    prioridade: 'Crítica',
    status: 'Em andamento',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Ana 👋</Text>
          <Text style={styles.greetingSubtext}>
            Este é o resumo dos chamados que você registrou no N.O.S.
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Novo Chamado Button */}
        <View style={styles.newButtonContainer}>
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => navigation.navigate('NovoChamado')}
          >
            <MaterialIcons name="add-circle" size={24} color="#fff" />
            <Text style={styles.newButtonText}>Novo chamado</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, styles.statIconTodos]}>
              <MaterialIcons name="description" size={32} color="#0284c7" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Total enviados</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, styles.statIconAberto]}>
              <MaterialIcons name="mail-outline" size={32} color="#d97706" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Aberto</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, styles.statIconAndamento]}>
              <MaterialIcons name="schedule" size={32} color="#d97706" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Em andamento</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, styles.statIconConcluido]}>
              <MaterialIcons name="check-circle" size={32} color="#059669" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Concluídos</Text>
            </View>
          </View>
        </View>

        {/* Meus Chamados Recentes */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Meus chamados recentes</Text>
            <TouchableOpacity style={styles.recentLink}>
              <Text style={styles.recentLinkText}>Ver todos</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#2563eb" />
            </TouchableOpacity>
          </View>

          {mockChamados.map((chamado) => (
            <View key={chamado.id} style={styles.chamadoCard}>
              <Text style={styles.chamadoId}>{chamado.id}</Text>
              <Text style={styles.chamadoTitle}>{chamado.titulo}</Text>

              <View style={styles.tagsContainer}>
                <Text
                  style={[
                    styles.tag,
                    chamado.prioridade === 'Alta'
                      ? styles.tagAlta
                      : chamado.prioridade === 'Crítica'
                      ? styles.tagCritica
                      : styles.tagMedia,
                  ]}
                >
                  {chamado.prioridade}
                </Text>
                <Text
                  style={[
                    styles.tag,
                    chamado.status === 'Aberto'
                      ? styles.tagAberto
                      : styles.tagAndamento,
                  ]}
                >
                  {chamado.status}
                </Text>
              </View>

              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}