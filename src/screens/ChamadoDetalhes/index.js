import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

export default function ChamadoDetalhes({ route, navigation }) {
  const { item } = route.params || {};
  const chamado = item || {
    id: '#004',
    title: 'Projetor não reconhece cabo HDMI',
    status: 'Concluído',
    priority: 'Média',
    category: 'Hardware',
    location: 'Bloco A — Laboratório 03',
    equipment: 'PROJ-03',
    openedAt: '20/07/2026 às 08:20',
    updatedAt: '22/07/2026 às 12:10',
    attachments: [ { name: 'comprovante-atendimento.pdf', size: '1,2 MB' } ],
    supportResponse: { tech: 'Téc. Marcos Lima', role: 'Técnico de TI', date: '22/07/2026 às 12:10', message: 'Cabo HDMI substituído e testado. Chamado concluído.' },
    history: [
      { title: 'Chamado criado', desc: 'Ocorrência registrada pelo solicitante.', date: '20/07/2026 às 08:20' },
      { title: 'Em atendimento', desc: 'Equipamento levado para testes.', date: '21/07/2026 às 06:00' },
      { title: 'Chamado concluído', desc: 'Problema solucionado e validado com o solicitante.', date: '22/07/2026 às 12:10' },
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>{chamado.id}</Text>
      </View>

      <Text style={styles.chamadoTitle}>{chamado.title}</Text>

      <View style={styles.pillsRow}>
        <View style={[styles.statusPill, chamado.status === 'Concluído' ? styles.statusDone : styles.statusOpen]}>
          <Text style={styles.statusText}>{chamado.status}</Text>
        </View>
        <View style={[styles.priorityPill, styles.media]}>
          <Text style={styles.priorityText}>{chamado.priority}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Categoria</Text>
        <Text style={styles.infoValue}>{chamado.category}</Text>

        <Text style={styles.infoLabel}>Local / Setor</Text>
        <Text style={styles.infoValue}>{chamado.location}</Text>

        <Text style={styles.infoLabel}>Equipamento</Text>
        <Text style={styles.infoValue}>{chamado.equipment}</Text>

        <Text style={styles.infoLabel}>Aberto em</Text>
        <Text style={styles.infoValue}>{chamado.openedAt}</Text>

        <Text style={styles.infoLabel}>Última atualização</Text>
        <Text style={styles.infoValue}>{chamado.updatedAt}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Anexos</Text>
        {(chamado.attachments || []).length > 0 ? (
          (chamado.attachments || []).map((a, i) => (
            <View key={i} style={styles.attachmentRow}>
              <MaterialIcons name="attach-file" size={18} color="#2563eb" />
              <Text style={styles.attachmentText}>{a.name} — {a.size}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.infoValue}>Nenhum anexo</Text>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Retorno do suporte</Text>
        <View style={styles.supportBox}>
          <Text style={styles.supportName}>{chamado.supportResponse?.tech || '—'}</Text>
          <Text style={styles.supportRole}>{chamado.supportResponse?.role || ''} {chamado.supportResponse?.date ? `— ${chamado.supportResponse.date}` : ''}</Text>
          <Text style={styles.supportMessage}>{chamado.supportResponse?.message || 'Sem resposta do suporte ainda.'}</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Histórico</Text>
        {(chamado.history || []).length > 0 ? (
          (chamado.history || []).map((h, i) => (
            <View key={i} style={styles.historyRow}>
              <View style={styles.historyDot} />
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>{h.title}</Text>
                <Text style={styles.historyDesc}>{h.desc}</Text>
                <Text style={styles.historyDate}>{h.date}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.infoValue}>Sem histórico por enquanto.</Text>
        )}
      </View>
    </ScrollView>
  );
}
