import React, { useCallback, useRef } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

import {
  Container,
  CreateAccountButton,
  CreateAccountButtonText,
  Title,
  ForgotPassword,
  ForgotPasswordText
} from './styles';

interface SignFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { signIn, user } = useAuth();

  console.log(user);

  const handleSubmit = useCallback(
    async (data: SignFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });

        Alert.alert('Sucesso!', 'Você Autenticou');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Erro na Autenticação!',
          'Ocorreu um erro ao fazer login, cheque as credenciais');
      }
    },
    [],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? "padding" : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit} >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                name="email"
                icon="mail"
                placeholder="E-mail"
              />

              <Input
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha" />
            </Form>
            <Button onPress={() => {
              formRef.current?.submitForm();
            }}>Entrar</Button>
            <ForgotPassword onPress={() => { }}>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>
          Criar uma conta
        </CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn;
