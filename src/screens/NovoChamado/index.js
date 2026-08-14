import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

// Tela: Novo Chamado
// Responsável por renderizar o formulário que o usuário utiliza
// para registrar um novo chamado no sistema. Contém validações
// básicas no front-end e placeholders para integração com a API.

export default function NovoChamadoScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Hardware');
  const [local, setLocal] = useState('');
  const [equipamento, setEquipamento] = useState('');
  const [prioridade, setPrioridade] = useState('Média');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);
  const [showPrioridades, setShowPrioridades] = useState(false);

  const handleEnviar = () => {
    if (loading) return;
    if (!titulo || !local || !descricao) {
      Alert.alert('Aviso', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      // Aqui você faria a chamada para a API (use async/await se necessário)
      Alert.alert('Sucesso', 'Chamado enviado com sucesso!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar o chamado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Novo Chamado</Text>
        <Text style={styles.subtitle}>
          Descreva a ocorrência com o máximo de detalhes para agilizar o atendimento.
        </Text>
      </View>

      <View style={styles.form}>
        {/* Título */}
        <View style={styles.field}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="label" size={20} color="#2563eb" />
            <Text style={styles.label}>Título</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Computador da secretaria não liga"
            placeholderTextColor="#999"
            value={titulo}
            onChangeText={setTitulo}
          />
        </View>

        {/* Categoria */}
        <View style={styles.field}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="category" size={20} color="#2563eb" />
            <Text style={styles.label}>Categoria</Text>
          </View>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.fakePicker}
              onPress={() => setShowCategorias(!showCategorias)}
            >
              <Text style={styles.pickerText}>{categoria}</Text>
            </TouchableOpacity>
            {showCategorias && (
              <View style={styles.optionsContainer}>
                {['Hardware', 'Software', 'Rede', 'Outro'].map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.option}
                    onPress={() => {
                      setCategoria(opt);
                      setShowCategorias(false);
                    }}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Local/Setor */}
        <View style={styles.field}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="location-on" size={20} color="#2563eb" />
            <Text style={styles.label}>Local / Setor</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Bloco A"
            placeholderTextColor="#999"
            value={local}
            onChangeText={setLocal}
          />
        </View>

        {/* Equipamento */}
        <View style={styles.field}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="devices" size={20} color="#9ca3af" />
            <Text style={styles.label}>Equipamento (opcional)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex.: PC-03, IMP-204"
            placeholderTextColor="#999"
            value={equipamento}
            onChangeText={setEquipamento}
          />
        </View>

        {/* Prioridade */}
        <View style={styles.field}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="warning" size={20} color="#2563eb" />
            <Text style={styles.label}>Prioridade</Text>
          </View>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.fakePicker}
              onPress={() => setShowPrioridades(!showPrioridades)}
            >
              <Text style={styles.pickerText}>{prioridade}</Text>
            </TouchableOpacity>
            {showPrioridades && (
              <View style={styles.optionsContainer}>
                {['Baixa', 'Média', 'Alta', 'Crítica'].map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.option}
                    onPress={() => {
                      setPrioridade(opt);
                      setShowPrioridades(false);
                    }}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.field}>
          <Text style={styles.label}>Descrição do problema</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Conte o que aconteceu, quando começou e o que já foi tentado..."
            placeholderTextColor="#999"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Imagem */}
        <View style={styles.field}>
          <Text style={styles.label}>Imagem do problema (opcional)</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => {
              Alert.alert('Atenção', 'Funcionalidade de anexar imagem ainda não implementada');
            }}
          >
            <MaterialIcons name="add-a-photo" size={32} color="#2563eb" />
            <Text style={styles.imageButtonText}>Clique para anexar uma imagem do problema</Text>
            <Text style={styles.imageInfo}>PNG ou JPG até 5 MB</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleEnviar}>
            <MaterialIcons name="send" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Enviar chamado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
