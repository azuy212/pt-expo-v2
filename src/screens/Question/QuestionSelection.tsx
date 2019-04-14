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
//   sSection: string;
//   sChapter: string;
//   sType: string;
// }

// export default class LectureSelection extends Component<NavigationScreenProps, IState> {
//   state = {
//     sSection: '',
//     sChapter: '',
//     sType: '',
//   };

//   onClassChange = (itemValue: any) => {
//     this.setState({ sSection: itemValue });
//   }
//   onSubjectChange = (itemValue: any) => {
//     this.setState({ sChapter: itemValue });
//   }
//   onTypeSelection = (itemValue: any) => {
//     this.setState({ sType: itemValue });
//   }
//   render() {
//     const { params } = this.props.navigation.state;
//     return (
//       <Container>
//         <HeaderComponent {...this.props} title={SCREEN_TITLE} />
//         <Text style={styles.textStyle}>Select Lecture</Text>
//         <Content contentContainerStyle={styles.container}>
//         <Dropdown
//           sValue={this.state.sSection}
//           list={lectureService.getTitles('', '')}
//           onValueChange={this.onClassChange}
//         />
//         <Dropdown
//           sValue={this.state.sChapter}
//           list={lectureService.getSections(this.state.sSection)}
//           onValueChange={this.onSubjectChange}
//         />
//         <Dropdown
//           sValue={this.state.sType}
//           list={lectureService.getSubsections(this.state.sChapter)}
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
