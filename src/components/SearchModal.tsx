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
import { NavigationStackScreenProps } from 'react-navigation-stack';

const courseService = CourseService.getInstance();

type AllSearchProps = { search: string } & IProps & NavigationStackScreenProps;

const SearchResult = (props: AllSearchProps) => {
  const result = courseService.getSearchResult(props.search);
  return (
      <FlatList
        style={styles.listStyle}
        data={result}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              const { subject, ch_tittle, section, subsection, class: sClass } = item;
              if (courseService.canGoNext(sClass, subject)) {
                props.navigation.navigate('LectureDetail', {
                  sClass: item.class,
                  sSubject: subject,
                  sTitle: ch_tittle,
                  sSection: section,
                  sSubsection: subsection,
                });
              }
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
  );
};

interface IProps {
  visible: boolean;
  hideModal: () => void;
}

type AllProps = NavigationStackScreenProps & IProps;

interface IState {
  search: string;
}

export default class SearchModal extends Component<AllProps, IState> {
  state = {
    search: '',
  };
  async componentDidMount() {
    // await courseService.init();
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
          <Header style={{ height: headerHeight }} searchBar={true} rounded={true} transparent={true}>
            <Item>
              <Icon name='md-arrow-back' onPress={this.props.hideModal} />
              <Input placeholder='Search' value={this.state.search} onChangeText={text => this.setState({ search: text })} />
              {this.state.search ? <Icon name='md-close-circle' onPress={() => this.setState({ search: '' })} /> : null}
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
