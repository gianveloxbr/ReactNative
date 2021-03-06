import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AccordionObject from '../../components/accordionObject';
import {View, Text, TouchableOpacity} from 'react-native';

import Styles from './styles';

import {ScrollView} from 'react-native-gesture-handler';

import House from '../house';

import {obterPesquisa} from '../../services/imovelService';

function PesquisaList({navigation, descricao}) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [imovelList, setImovelList] = useState([]);

  useEffect(() => {
    lerImoveis();
  }, []);

  async function lerImoveis() {
    await obterPesquisa(descricao)
      .then(res => {
        setImovelList(res);
        console.tron.log(res);
      })
      .catch(err => {
        console.tron.log(err);
      });

    dispatch({type: 'SET_NAVEGACAO_FINALIZAR'});
  }

  return (
    <View style={Styles.containerPerfil}>
      <ScrollView>
        {imovelList.map(imovel => {
          return (
            <AccordionObject
              title={
                'Logradouro:' +
                imovel.LogradouroImovel +
                ' Número: ' +
                imovel.Numero +
                ' Bairro: ' +
                imovel.Bairro
              }
              id={imovel.IdImovel}
              icone="home"
              children={
                <House
                  imovel={imovel}
                  navigation={navigation}
                  id={imovel.IdImovel}
                />
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default PesquisaList;
