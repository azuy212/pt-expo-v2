import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Header, Item, Icon, Input, Button } from 'native-base';
import { headerHeight } from '../theme/header';
import CourseService from '../services/course';
import { NavigationScreenProps } from 'react-navigation';

const courseService = new CourseService();

type AllSearchProps = { search: string } & IProps & NavigationScreenProps;

const SearchResult = (props: AllSearchProps) => {
  const result = courseService.getSearchResult(props.search);
  return (
    <View>
      <FlatList
        style={styles.listStyle}
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
            }}
          >
            <View style={styles.sectionItem}>
              <Text style={{ fontWeight: 'bold' }}>
                {index + 1}. {item.ch_tittle} ({item.course})
              </Text>
              <Text>{item.section}</Text>
              <Text>
                {item.subsection}
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
  async componentDidMount() {
    await courseService.init();
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this.props.hideModal}
      >
        <View style={{ flex: 1 }}>
          <Header style={{ height: headerHeight }} searchBar={true} rounded={true}>
            <Item>
              <Icon name='md-arrow-back' onPress={this.props.hideModal} />
              <Input placeholder='Search' value={this.state.search} onChangeText={text => this.setState({ search: text })} />
              <Icon name='md-close-circle' onPress={() => this.setState({ search: '' })} />
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
  listStyle: {
    backgroundColor: '#FFFFFF',
  },
  textStyle: {
    fontSize: 15,
  },
});
