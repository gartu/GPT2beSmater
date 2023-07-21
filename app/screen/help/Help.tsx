import React, {useEffect} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import screens from '../screens';
import {Button} from '@rneui/base';
import {Text} from '@rneui/themed';
import {Title} from '../../shared/components/Title';
import {ScrollView} from 'react-native-gesture-handler';

type HelpProps = {
  navigation: NavigationProp<any, 'Help'>;
};

export function Help({navigation}: HelpProps): JSX.Element {
  useEffect(() => {}, []);

  const openParameters = async () => {
    navigation.navigate(screens.parameters);
  };

  return (
    <ScrollView>
      <Title>Créer un compte OpenAI</Title>
      <Text>
        Rendez-vous sur https://openai.com et créez-vous un compte si vous n'en
        n'avez pas déjà un.
      </Text>
      <Image
        source={require('./assets/start.png')}
        style={printScreenStyle(300)}
      />
      <Image
        source={require('./assets/signup.png')}
        style={printScreenStyle(300)}
      />
      <Text>
        Si vous disposez déjà d'un compte, connectez-vous via "Log in".{'\n'}
        {'\n'}
        Afin de pouvoir utiliser l'API, vous devez premièrement renseigner un
        moyen de paiement.{'\n'}Pour cela, ouvrez le menu et rendez-vous dans la
        partie correspondante.
      </Text>
      <Image
        source={require('./assets/api.png')}
        style={printScreenStyle(300)}
      />
      <Image
        source={require('./assets/menu-api.png')}
        style={printScreenStyle(300)}
      />
      <Image
        source={require('./assets/menu-payment.png')}
        style={printScreenStyle(300)}
      />
      <Text>
        Insérer vos données de paiements, puis définissez directement une
        limites maximale grâce au menu suivant :
      </Text>
      <Image
        source={require('./assets/menu-limit.png')}
        style={printScreenStyle(300)}
      />
      <Text>
        Les coûts d'utilisation du modèles standard étant faibles, vous pouvez
        mettre des bornes très basses.{'\n'}Dans le cas ci-dessous, une limite
        maximale de 2.- par mois a été définie.
      </Text>
      <Image
        source={require('./assets/usage-limit.png')}
        style={printScreenStyle(300)}
      />
      <Text>
        Vous pouvez désormais générer une clé API, il s'agit d'une sorte de clé
        d'accès permettant de lier l'application à votre compte.{'\n'}
        {'\n'}***{'\n'}Toutes les données de cette application sont chiffrées
        sur votre téléphone et aucune données ne sera jamais transmise vers
        l'extérieur.{'\n'}Cette application étant open source, le fonctionnement
        est visible de tous sur le repo https://github.com/gartu/GPToBeSmarter
        {'\n'}***
      </Text>
      <Image
        source={require('./assets/menu-api-key.png')}
        style={printScreenStyle(300)}
      />
      <Image
        source={require('./assets/new-api-key.png')}
        style={printScreenStyle(300)}
      />
      <Image
        source={require('./assets/new-api-key2.png')}
        style={printScreenStyle(300)}
      />
      <Text>
        Voilà ! Votre clé est créée, il ne vous reste plus qu'à la copier et à
        l'insérer dans les paramètres. Vous pourrez ensuite vérifier son bon
        fonctionnement.
      </Text>
      <Image
        source={require('./assets/new-api-key3.png')}
        style={printScreenStyle(300)}
      />
      <Button title="Insérer ma clé d'API" onPress={openParameters} />
      <Text></Text>
    </ScrollView>
  );
}

const printScreenStyle: (height: number) => StyleProp<ImageStyle> = (
  height: number,
) => {
  // 722 x 1312
  const ratio = 1312 / height;
  const width = 722 / ratio;
  return {
    margin: 10,
    width,
    height,
  };
};
