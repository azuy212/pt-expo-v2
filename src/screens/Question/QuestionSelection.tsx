// import React, { Component } from 'react';
// import Dropdown from '../../components/Dropdown';
// import LectureService from '../../services/lecture';
// import { NavigationScreenProps } from 'react-navigation';
// import { Container, Text, Content } from 'native-base';
// import HeaderComponent from '../../components/HeaderComponent';
// import { StyleSheet } from 'react-native';

// /******************************** Screen Title /********************************/
// const SCREEN_TITLE = 'Questions';
// /******************************************************************************/

// const lectureService = new LectureService();

// interface IState {
//   selectedSection: string;
//   selectedChapter: string;
//   selectedType: string;
// }

// export default class LectureSelection extends Component<NavigationScreenProps, IState> {
//   state = {
//     selectedSection: '',
//     selectedChapter: '',
//     selectedType: '',
//   };

//   onClassChange = (itemValue: any) => {
//     this.setState({ selectedSection: itemValue });
//   }
//   onSubjectChange = (itemValue: any) => {
//     this.setState({ selectedChapter: itemValue });
//   }
//   onTypeSelection = (itemValue: any) => {
//     this.setState({ selectedType: itemValue });
//   }
//   render() {
//     const { params } = this.props.navigation.state;
//     return (
//       <Container>
//         <HeaderComponent {...this.props} title={SCREEN_TITLE} />
//         <Text style={styles.textStyle}>Select Lecture</Text>
//         <Content contentContainerStyle={styles.container}>
//         <Dropdown
//           selectedValue={this.state.selectedSection}
//           list={lectureService.getTitles('', '')}
//           onValueChange={this.onClassChange}
//         />
//         <Dropdown
//           selectedValue={this.state.selectedChapter}
//           list={lectureService.getSections(this.state.selectedSection)}
//           onValueChange={this.onSubjectChange}
//         />
//         <Dropdown
//           selectedValue={this.state.selectedType}
//           list={lectureService.getSubsections(this.state.selectedChapter)}
//           onValueChange={this.onTypeSelection}
//         />
//         </Content>
//       </Container>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textStyle: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginTop: 50,
//   },
// });
