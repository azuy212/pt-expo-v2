import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Header, Item, Icon, Input, Button } from 'native-base';
import { headerHeight } from '../theme/header';
import LectureService from '../services/lecture';
import { NavigationScreenProps } from 'react-navigation';

const lectureService = new LectureService();

type AllSearchProps = { search: string } & IProps & NavigationScreenProps;

const SearchResult = (props: AllSearchProps) => {
  const result = lectureService.getSearchResult(props.search);
  return (
    <View>
      <FlatList
        style={{ backgroundColor: '#ffffff' }}
        data={result}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              const { subject, ch_tittle, section, subsection } = item;
              props.navigation.navigate('LectureDetail', {
                sClass: item.class,
                sSubject: subject,
                sTitle: ch_tittle,
                sSection: section,
                sSubsection: subsection,
              });
              props.hideModal();
            }}>
            <View style={styles.sectionItem}>
              <Text style={styles.textStyle}>
                {index + 1}. {item.subsection || item.section}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

interface IProps {
  visible: boolean;
  hideModal: () => void;
}

type AllProps = NavigationScreenProps & IProps;

interface IState {
  search: string;
}

export default class SearchModal extends Component<AllProps, IState> {
  state = {
    search: '',
  };
  render() {
    return (
      <Modal
        animationType='fade'
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this.props.hideModal}>
        <View style={{ flex: 1 }}>
          <Header style={{ height: headerHeight }} searchBar={true} rounded={true}>
            <Item>
              <Icon name='ios-search' />
              <Input placeholder='Search' onChangeText={text => this.setState({ search: text })} />
              <Icon name='md-close-circle' onPress={this.props.hideModal} />
            </Item>
            <Button transparent={true}>
              <Text>Search</Text>
            </Button>
          </Header>
          <SearchResult search={this.state.search} {...this.props} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  sectionItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 12,
  },
  textStyle: {
    fontSize: 15,
  },
});
