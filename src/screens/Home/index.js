// Tela: Home
// Exibe resumo dos chamados do usuário, estatísticas e atalhos.
import { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { AuthContext } from '../../contexts/AuthContext';

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
  const { logout, user } = useContext(AuthContext) || {};
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notifications, setNotifications] = useState(2); // mock
  // Estado: controla se o popup de notificações está visível
  const [notifVisible, setNotifVisible] = useState(false);
  // Lista mock de notificações exibidas no popup
  // Lista mock de notificações (cada notificação referencia um chamado)
  const [notificationsList, setNotificationsList] = useState([
    { id: 'n1', chamadoId: '#003', title: 'Seu chamado está em atendimento', subtitle: '#003 — Sem acesso à rede no setor', time: 'há 12 min' },
    { id: 'n2', chamadoId: '#002', title: 'Comentário do técnico', subtitle: '#002 — Substituição do mouse prevista para hoje', time: 'há 1 h' },
    { id: 'n3', chamadoId: '#004', title: 'Chamado concluído', subtitle: '#004 — Projetor do Laboratório 03', time: 'há 9 dias' },
  ]);
  const drawerAnim = useRef(new Animated.Value( -Dimensions.get('window').width )).current;

  const toggleDrawer = (show) => {
    if (show) setDrawerVisible(true);
    Animated.timing(drawerAnim, {
      toValue: show ? 0 : -Dimensions.get('window').width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (!show) setDrawerVisible(false);
    });
  };

  // Ao tocar numa notificação: fecha o popup, decrementa o contador
  // e navega para a tela de detalhes passando um objeto mínimo do chamado.
  const handleNotifPress = (n) => {
    setNotifVisible(false);
    setNotifications((prev) => Math.max(0, prev - 1));
    const item = {
      id: n.chamadoId || '#000',
      title: n.title,
      status: 'Aberto',
      priority: 'Média',
      category: '',
    };
    navigation.navigate('ChamadoDetalhes', { item });
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => toggleDrawer(true)} style={styles.menuButton}>
            <MaterialIcons name="menu" size={24} color="#111827" />
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setNotifVisible(true)}>
              <MaterialIcons name="notifications-none" size={22} color="#111827" />
              {notifications > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notifications}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Perfil')}
              style={styles.avatarButton}
            >
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitials}>{(user?.email || 'A').charAt(0).toUpperCase()}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

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
            <TouchableOpacity style={styles.recentLink} onPress={() => navigation.navigate('Chamados')}>
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

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('ChamadoDetalhes', { item: chamado })}
              >
                <Text style={styles.detailsButtonText}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Drawer lateral simples (não depende de @react-navigation/drawer) */}
      {drawerVisible && (
        <TouchableOpacity style={styles.drawerOverlay} activeOpacity={1} onPress={() => toggleDrawer(false)} />
      )}
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: drawerAnim }] },
        ]}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>N.O.S.</Text>
          <TouchableOpacity onPress={() => toggleDrawer(false)}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.drawerItem} onPress={() => { toggleDrawer(false); navigation.navigate('Home'); }}>
          <MaterialIcons name="dashboard" size={20} color="#fff" />
          <Text style={styles.drawerItemText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => { toggleDrawer(false); navigation.navigate('NovoChamado'); }}>
          <MaterialIcons name="add-circle" size={20} color="#fff" />
          <Text style={styles.drawerItemText}>Novo Chamado</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => { toggleDrawer(false); navigation.navigate('Chamados'); }}>
          <MaterialIcons name="list" size={20} color="#fff" />
          <Text style={styles.drawerItemText}>Meus Chamados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => { toggleDrawer(false); navigation.navigate('Perfil'); }}>
          <MaterialIcons name="person" size={20} color="#fff" />
          <Text style={styles.drawerItemText}>Meu Perfil</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.drawerItem} onPress={() => { toggleDrawer(false); if (typeof logout === 'function') logout(); }}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.drawerItemText}>Sair</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Popup de Notificações */}
      {notifVisible && (
        <>
          {/* Overlay semitransparente: fecha o popup ao tocar fora */}
          <TouchableOpacity style={styles.notifOverlay} activeOpacity={1} onPress={() => setNotifVisible(false)} />
          {/* Caixa de notificações alinhada ao topo-direita */}
          <View style={styles.notifBox}>
            <Text style={styles.notifTitle}>Notificações</Text>
            {notificationsList.map((n) => (
              <TouchableOpacity key={n.id} style={styles.notifItem} onPress={() => handleNotifPress(n)}>
                <Text style={styles.notifItemTitle}>{n.title}</Text>
                <Text style={styles.notifItemSub}>{n.subtitle}</Text>
                <Text style={styles.notifItemTime}>{n.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}