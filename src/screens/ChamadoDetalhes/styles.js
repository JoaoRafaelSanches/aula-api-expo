// Estilos: ChamadoDetalhes
// Arquivo criado para evitar erro de import e fornecer estilos
// legíveis em Português para a tela de detalhes do chamado.
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563eb',
  },
  chamadoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 6,
    marginBottom: 10,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusOpen: {
    backgroundColor: '#fef3c7',
  },
  statusDone: {
    backgroundColor: '#d1fae5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#064e3b',
  },
  priorityPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#fed7aa',
  },
  media: {},
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400e',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  attachmentText: {
    color: '#2563eb',
    fontWeight: '600',
    marginLeft: 6,
  },
  supportBox: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
  },
  supportName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  supportRole: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  supportMessage: {
    fontSize: 14,
    color: '#111827',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  historyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
    marginTop: 6,
    marginRight: 10,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontWeight: '700',
    color: '#111827',
  },
  historyDesc: {
    color: '#6b7280',
    marginTop: 4,
  },
  historyDate: {
    color: '#9ca3af',
    marginTop: 6,
    fontSize: 12,
  },
});

export default styles;
